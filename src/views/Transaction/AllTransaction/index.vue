<template>
    <div class="pa-sm-2">
        <v-card class="px-3 py-2 transparent" outlined>
            <v-row align="center">
                <v-col cols="12" sm="8">
                    <div>
                        <span class="titles">All Transaction</span>

                        <v-btn class="ml-4" @click="openFilterModal">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                        <filterMenu v-if="filterDialog" :stored_filter_data="passedData" @filterInput="filterValues" :showModal2="filterDialog"
                            @close="closeDialog">
                        </filterMenu>
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <v-card class="mt-3">
            <div class="d-flex align-center pt-4 pl-1">
                <v-row>
                    <v-col class="justify-start">
                        <span class="ml-3 table_label"> Listing - All Transactions 
                            <span v-if="this.passedData.startDate && this.passedData.endDate"> - {{ this.passedData.startDate }} to {{ this.date_test }} </span>
                            <span v-else-if="this.passedData.startDate && this.passedData.endDate == ''"> - From {{ this.passedData.startDate }}</span> 
                            <span v-else-if="this.passedData.startDate == '' && this.passedData.endDate"> - Till {{ this.date_test }}</span> 
                            </span>
                    </v-col>
                </v-row>
            </div>

            <div class="ma-4">
                <v-divider class="mt-1"></v-divider>
                <v-data-table :headers="headers" :items="sales" :search="search" :page.sync="pagination.page"
                    :footer-props="{
                        itemsPerPageOptions: pageSizeOpts, showFirstLastPage: true,
                        firstIcon: 'mdi-chevron-double-left',
                        lastIcon: 'mdi-chevron-double-right',
                        prevIcon: 'mdi-chevron-left',
                        nextIcon: 'mdi-chevron-right',
                        showCurrentPage: true,
                    }" :items-per-page.sync="pagination.pageSize" :server-items-length="pagination.total"
                    @update:page="pageChg" @update:items-per-page="pageSizeChg" :loading="tableLoading"
                    loading-text="Loading... Please wait" @click:row="openDialog" disable-sort>

                    <!-- tooltips for header -->
                    <template v-for="(h, index) in headers" v-slot:[`header.${h.value}`]>
                        <v-tooltip top :key="index">
                            <template v-slot:activator="{ on }">
                                <span v-on="on">{{ h.text }}</span>
                            </template>
                            <span>{{ h.tooltips }}</span>
                        </v-tooltip>
                    </template>

                    <!-- date time -->
                    <template v-slot:[`item.txDt`]="{ item }">
                        {{ setUTCTimeWithTimeZone(item.txDt) }}
                    </template>

                    <!-- clickable id -->
                    <template v-slot:[`item.id`]="{ item }">
                        <v-hover>
                            <a slot-scope="{ hover }" :class="`${hover ? 'class1' : ''}`" @click="openDialog(item)">
                                {{ item.id }}
                            </a>
                        </v-hover>
                    </template>
                    <!-- scheme -->
                    <template v-slot:[`item.scheme`]="{ item }">
                        <v-chip :color="schemeColor(item.scheme)" small>
                            {{ schemeText(item.scheme) }}
                        </v-chip>
                    </template>
                    <!-- tooltip for respcode -->
                    <template v-slot:[`item.respCode`]="{ item }">
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <span v-bind="attrs" v-on="on">{{ item.respCode }}</span>
                            </template>
                            <span>{{ respCodeToolTips(item.respCode) }}</span>
                        </v-tooltip>
                    </template>
                    <!-- batchNo -->
                    <template v-slot:[`item.batchNo`]="{ item }">
                        {{ padZero(item.batchNo) }}
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <dialogModal v-if="dialog" :value="value" :showModal="dialog" @close="closeDialog"></dialogModal>
        
        {{ passedData }}
        Total: {{ pagination.total }}
        Page: {{ pagination.page }}
        PageSize: {{ pagination.pageSize }}
        {{ sales }}
        
        
        
    </div>
</template>

<script>
import { transactionApi } from '@/api/transaction';
import { setUTCTimeWithTimeZone } from '@/util/tools';
import { mapState } from 'vuex';

export default {

    data: () => ({
        search: '',
        table: [],
        dialog: false,
        value: [],

        setUTCTimeWithTimeZone: setUTCTimeWithTimeZone,

        sales: [],
        tableLoading: false,

        initialRecObj: {
            total: 0,
            page: 1,
            pageSize: 10,
            data: [],
        },

        date_test : null,

        initialLoad: null,

        pagination: {
            total: 0,
        },
        passedData: {},
        filterDialog: false,
    }),

    created() {
        this.pagination = { ...this.paginationOpts, ...this.pagination };
        this.getTotalRec();
        this.initialLoad = true;
    },

    methods: {
        getTotalRec() {
            const params = {
                value: this.passedData,
                page: 0,
                pageSize: this.pagination.pageSize,
            };
            this.tableLoading = true;
            return transactionApi.allTransactionList(params).then(res => {
                if (res.ret == '0' && res.data.length != 0) {
                    this.sales = res.data[0]
                    this.pagination.total = res.data[1][0].cnt;
                    if (this.initialLoad) {
                        this.initialRecObj.total = this.pagination.total;
                    }
                    this.tableLoading = false;
                }
                else {
                    this.sales = []
                    this.tableLoading = false;

                }
            });
        },

        getList() {
            const params = {
                value: this.passedData,
                page: this.pagination.page,
                pageSize: this.pagination.pageSize,
            };
            return transactionApi.allTransactionList(params).then(res => {
                this.sales = res.data.map((item, index) => {
                    return {
                        ...item,
                        no: index + 1,
                    }
                });
                this.tableLoading = false;
                if (this.initialLoad) {
                    this.initialRecObj.page = this.pagination.page;
                    this.initialRecObj.pageSize = this.pagination.pageSize;
                    this.initialRecObj.data = this.data;
                    this.initialLoad = false;
                }
            });
        },

        pageChg() {
            this.getList();
        },

        pageSizeChg() {
            this.getList();
        },

        filterValues(value) {
            this.date_test = value.date_time
            this.passedData = value;
            this.getTotalRec();
        },

        openDialog(item) {
            this.selectedIndex = this.table.indexOf(item);
            this.editedItem = Object.assign({}, item);
            const data = {
                'id': this.editedItem.id
            }
            this.value.push(data);
            this.dialog = true;
        },

        openFilterModal() {
            this.filterDialog = true;
        },

        closeDialog() {
            this.value = [];
            this.dialog = false;
            this.filterDialog = false;
        },
    },

    computed: {
        mobile() {
            return this.$vuetify.breakpoint.smAndUp;
        },

        headers() {
            return [
                { text: 'ID', align: 'start', value: 'id', tooltips: 'ID' },
                { text: 'Date Time', value: 'txDt', tooltips: 'Date Time' },
                { text: 'Type', value: 'txType', tooltips: 'Type' },
                { text: 'Plaza', value: 'plaza', tooltips: 'Plaza' },
                { text: 'Lane', value: 'lane', tooltips: 'Lane' },
                { text: 'Txn Amt', value: 'amt', tooltips: 'Transaction Amount', align: 'center' },
                { text: 'Scheme', value: 'scheme', tooltips: 'Scheme' },
                { text: 'Card Number', value: 'cardNo', tooltips: 'Card Number' },
                { text: 'MID', value: 'mid', tooltips: 'MID' },
                { text: 'TID', value: 'tid', tooltips: 'TID' },
                { text: 'Resp#', value: 'respCode', tooltips: 'Response Code', align: 'center' },
                { text: 'Appr#', value: 'apprCode', tooltips: 'Approval Code' },
                { text: 'Batch#', value: 'batchNo', tooltips: 'Batch Number' },
            ]
        },

        ...mapState({
            pageSizeOpts: state => state.app.pageSizeOpts,
            paginationOpts: state => state.app.paginationOpts,
        }),
    },

}
</script>

<style scoped>
#no-background-hover::before {
    background-color: transparent !important;
}

.class1 {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
</style>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

@media #{map-get($display-breakpoints, 'sm-and-up')}
  .v-text-field
    width: 250px
    
</style>