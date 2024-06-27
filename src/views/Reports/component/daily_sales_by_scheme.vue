<template>
    <div>
        <v-data-table :headers="dailySalesBySchemeHeader" :items="dailySalesByScheme" :loading="tableLoading" disable-sort
            loading-text="Loading... Please wait"
            :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-chevron-double-left',
                lastIcon: 'mdi-chevron-double-right',
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                showCurrentPage: true,
            }">

            <!-- tooltips for header -->
            <template v-for="(h, index) in dailySalesBySchemeHeader" v-slot:[`header.${h.value}`]>
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
    </div>
</template>

<script>
import { reportApi } from '@/api/report'
import { setUTCDate, priceWithCommas, numberWithCommas } from '@/util/tools';

export default {

    data: () => ({
        dailySalesBySchemeHeader: [
            { text: 'Date', value: 'DD', tooltips: 'Date Time', width: '20%' },
            { text: 'Outlet', value: 'outlet', tooltips: 'Outlet', width: '20%' },
            { text: 'Scheme', value: 'scheme', tooltips: 'Scheme', width: '10%' },
            { text: 'Total Sales (RM)', value: 'totSale', tooltips: 'Total Sales (RM)', align: 'end', width: '20%' },
            { text: 'Trx. Count', value: 'txCnt', tooltips: 'Transaction Count', align: 'end', width: '20%' },
            { text: '', width: '' },

        ],

        dailySalesByScheme: [],

        tableLoading: false,
        priceWithCommas: priceWithCommas,
        numberWithCommas: numberWithCommas,
        setUTCDate: setUTCDate,
    }),

    created() {
        this.getDailyScheme();
    },

    methods: {
        getDailyScheme() {
            //daily outlet sales scheme
            this.tableLoading = true;
            return reportApi.dailySalesByScheme()
                .then(res => {
                    if (res.ret == '0') {
                        this.dailySalesByScheme = res.data.map((item, index) => {
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