<template>
    <div>
        <v-data-table :headers="isMobile ? mobile_headers : dailySalesByOutletHeaders" :items="dailySalesByOutlet"
            :loading="tableLoading" disable-sort loading-text="Loading... Please wait" :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-chevron-double-left',
                lastIcon: 'mdi-chevron-double-right',
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                showCurrentPage: true,
            }">

            <!-- tooltips for header -->
            <template v-for="(h, index) in dailySalesByOutletHeaders" v-slot:[`header.${h.value}`]>
                <v-tooltip top :key="index">
                    <template v-slot:activator="{ on }">
                        <span v-on="on">{{ h.text }}</span>
                    </template>
                    <span>{{ h.tooltips }}</span>
                </v-tooltip>
            </template>

            <template v-slot:[`item.outlet`]="{ item }">
                <span> {{ padString(item.outlet) }} </span>
            </template>

        </v-data-table>
        {{ dailySalesByOutlet }}
    </div>
</template>

<script>
import { reportApi } from '@/api/report'
import { setUTCDate, priceWithCommas, numberWithCommas } from '@/util/tools';

export default {

    data: () => ({
        dailySalesByOutletHeaders: [
            { text: 'Date', value: 'DD', align: 'start', tooltips: 'Date Time', width: '20%' },
            { text: 'Outlet', value: 'outlet', tooltips: 'Outlet', width: '20%' },
            { text: 'Total Sales (RM)', value: 'totSale', tooltips: 'Total Sales (RM)', align: 'end', width: '20%' },
            { text: '', width: '', align: ' d-none d-md-table-cell' },
            { text: 'Trx. Count', value: 'txCnt', tooltips: 'Transaction Count', align: 'end' },
            { text: '', width: '' },
            { text: '', width: '' },
            { text: '', width: '' },

        ],

        mobile_headers: [
            { text: 'Date', value: 'DD', align: 'start', tooltips: 'Date Time', width: '20%' },
            { text: 'Outlet', value: 'outlet', tooltips: 'Outlet', width: '20%' },
            { text: 'Total Sales (RM)', value: 'totSale', tooltips: 'Total Sales (RM)', align: 'end', width: '20%' },
            { text: 'Trx. Count', value: 'txCnt', tooltips: 'Transaction Count', align: 'end' },
        ],

        dailySalesByOutlet: [],
        tableLoading: false,
        setUTCDate: setUTCDate,
        priceWithCommas: priceWithCommas,
        numberWithCommas: numberWithCommas,

    }),

    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.smAndDown;
        },
    },

    created() {
        this.getDailyOutlet();
    },

    methods: {
        getDailyOutlet() {
            //daily outlet sales
            this.tableLoading = true;
            return reportApi.dailySalesByOutlet()
                .then(res => {
                    if (res.ret == '0') {
                        this.dailySalesByOutlet = res.data.map((item, index) => {
                            return {
                                ...item,
                                'DD': setUTCDate(item.DD),
                                'totSale': priceWithCommas(item.totSale),
                                'txCnt': numberWithCommas(item.txCnt),
                                no: index + 1,
                            }
                        });
                        this.tableLoading = false;
                    }
                })
        },
    }
}
</script>