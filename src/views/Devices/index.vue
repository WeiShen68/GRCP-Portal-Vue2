<template>
    <div class="pa-sm-2">
        <v-card class="px-3 mb-2 transparent" outlined>
            <div class="d-flex align-center py-4">
                <v-row align="center">
                    <v-col class="justify-start">
                        <span class="titles">Devices</span>
                    </v-col>
                </v-row>
            </div>
        </v-card>

        <v-card class="mt-3">
            <div class="d-flex align-center pt-4 pl-1">
                <v-row>
                    <v-col class="justify-start">
                        <span class="ml-3 table_label"> Listing - Devices </span>
                    </v-col>
                </v-row>
            </div>

            <div class="ma-4">
                <v-row>
                    <v-spacer v-if="mobile"></v-spacer>
                    <v-spacer v-if="mobile"></v-spacer>
                    <v-spacer v-if="mobile"></v-spacer>
                    <v-spacer v-if="mobile"></v-spacer>
                    <v-spacer v-if="mobile"></v-spacer>
                    <v-col :class="{ 'pr-3': $vuetify.breakpoint.mdAndDown }" >
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
                            dense outlined></v-text-field>
                    </v-col>
                </v-row>
            </div>

            <div class="ma-4">
                <v-divider class="mt-1"></v-divider>
                <v-data-table :headers="headers" :items="sales" :page.sync="pagination.page" disable-sort
                :footer-props="{
                        itemsPerPageOptions: pageSizeOpts, showFirstLastPage: true,
                        firstIcon: 'mdi-chevron-double-left',
                        lastIcon: 'mdi-chevron-double-right',
                        prevIcon: 'mdi-chevron-left',
                        nextIcon: 'mdi-chevron-right',
                        showCurrentPage: true,
                    }" :items-per-page.sync="pagination.pageSize"
                    :server-items-length="pagination.total" @update:page="pageChg" @update:items-per-page="pageSizeChg"
                    @click:row="openDialog" :loading="tableLoading" loading-text="Loading... Please wait">

                    <!-- tooltips for header -->
                    <template v-for="(h, index) in headers" v-slot:[`header.${h.value}`]>
                        <v-tooltip top :key="index">
                            <template v-slot:activator="{ on }">
                                <span v-on="on">{{ h.text }}</span>
                            </template>
                            <span>{{ h.tooltips }}</span>
                        </v-tooltip>
                    </template>

                    <!-- outlet -->
                    <template v-slot:[`item.outlet`]="{ item }">
                        <span> {{ padString(item.outlet) }} </span>
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <updateDevice v-if="dialog" :value="value" :smolModal="dialog" @close="closeDialog" @update="updateData">
        </updateDevice>
    </div>
</template>

<script>
import { deviceApi } from '@/api/device'
import { setUTCTime } from '@/util/tools';
import { mapState } from 'vuex';

export default {

    data: () => ({
        search: '',
        table: [],
        dialog: false,
        value: [],

        setUTCTime: setUTCTime,

        sales: [],

        initialRecObj: {
            total: 0,
            page: 1,
            pageSize: 10,
            data: [],
        },

        tableLoading: false,

        initialLoad: null,

        pagination: {
            total: 0,
        },

        timeout: null,

    }),

    created() {
        this.pagination = { ...this.paginationOpts, ...this.pagination };
        this.initialLoad = true;

        this.getTotalRec();
    },

    watch: {
        search(val) {

            clearTimeout(this.timeout);
            if (val.length >= 3) {
                this.timeout = setTimeout(() => {
                    this.pagination.page = 1;
                    this.getTotalRec();
                }, 500);
            } else if (this.isUndefinedNullOrEmpty(val)) {
                this.pagination.page = this.initialRecObj.page;
                this.pagination.total = this.initialRecObj.total;
                this.getTotalRec();
            }
        }
    },

    methods: {
        getTotalRec() {
            const params = {
                search: this.search,
                page: 0,
                pageSize: this.pagination.pageSize,
            };
            this.tableLoading = true;
            return deviceApi.deviceList(params).then(res => {
                this.sales = res.data[0]
                this.pagination.total = res.data[1][0].cnt;
                if (this.initialLoad) {
                    this.initialRecObj.total = this.pagination.total;
                }
                this.tableLoading = false;
            });
        },

        getList() {
            const params = {
                search: this.search,
                page: this.pagination.page,
                pageSize: this.pagination.pageSize,
            };
            return deviceApi.deviceList(params).then(res => {
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

        openDialog(item) {
            this.selectedIndex = this.table.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.value.push(this.editedItem)
            this.dialog = true
        },

        updateData() {
            this.getTotalRec();
            this.closeDialog();
        },

        closeDialog() {
            this.value = [];
            this.dialog = false;
        },
    },

    computed: {
        mobile() {
            return this.$vuetify.breakpoint.smAndUp;
        },

        headers() {
            return [
                { text: 'ID', align: 'start', value: 'id', tooltips: 'ID' },
                { text: 'Outlet ID', value: 'outletId', tooltips: 'Outlet ID' },
                { text: 'Outlet', value: 'outlet', tooltips: 'Outlet' },
                { text: 'Plaza', value: 'plaza', tooltips: 'Plaza' },
                { text: 'Lane', value: 'lane', tooltips: 'Lane' },
                { text: 'Device', value: 'name', tooltips: 'Device Name' },
                { text: 'MID', value: 'mid', tooltips: 'MID' },
                { text: 'TID', value: 'tid', tooltips: 'TID' },
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

.v-application--is-ltr .v-data-table__mobile-row__cell {
    text-align: center !important;
}
</style>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

@media #{map-get($display-breakpoints, 'sm-and-up')}
  .v-text-field
    width: 250px
    
</style>