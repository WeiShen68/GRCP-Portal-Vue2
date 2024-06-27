<template>
  <div class="pa-sm-2">
    <v-card class="transparent" outlined>
      <div class="d-flex align-center py-4">
        <v-row align="center">
          <v-col class="justify-start">
            <span class="titles">Dashboard <span class="subtitles"> {{ getCurrentDate(dateNow) }} </span> </span>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <v-card class="mt-3" outlined color="#F5B041">
      <div class="pa-4">
        <v-icon>mdi-hand-peace</v-icon> <span> Hello {{ getName }} !</span>
      </div>
      <div class="pl-5 pb-4">
        <span class=""> Last Login: {{ setUTCTimeWithTimeZone(getLastLogin) }} </span>
      </div>
    </v-card>

    <v-card class="transparent mt-5" outlined>
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-card class="d-flex flex-column" color="#EB984E" outlined height="150">
            <div class="pa-4">
              <span class="big_text text-truncate">RM {{ numberWithCommas(revenue) }}</span>
            </div>
            <div class="pl-4">
              <span class="smol_text">Revenue</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn block height="0" class="btn-orange" color="orange" @click="navigatePush('SaleTransactions')">Details
              <v-icon right dark>
                mdi-arrow-right-circle
              </v-icon>
            </v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-card class="d-flex flex-column" color="#85C1E9" outlined height="150">
            <div class="pa-4">
              <span class="big_text">{{ numberWithCommas(total_transaction) }}</span>
            </div>
            <div class="pl-4">
              <span class="smol_text">Total Transactions</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn block height="0" class="btn_blue" @click="navigatePush('AllTransactions')">Details
              <v-icon right dark>
                mdi-arrow-right-circle
              </v-icon>
            </v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-card class="d-flex flex-column" color="#A2D9CE" outlined height="150">
            <div class="pa-4">
              <span class="big_text">{{ numberWithCommas(active_machine) }}</span>
            </div>
            <div class="pl-4">
              <span class="smol_text">Active Machines</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn block height="0" class="btn_teal" @click="navigatePush('Devices')">Details
              <v-icon right dark>
                mdi-arrow-right-circle
              </v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>


  </div>
</template>

<script>
import { dashboardApi } from '@/api/dashboard'
import { numberWithCommas, getCurrentDate, setUTCTimeWithTimeZone } from '@/util/tools';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    // list: [
    //   { to: '', text: 'Home', },
    //   { to: '', text: 'Dashboard', disabled: false }
    // ],
    revenue: '',
    total_transaction: '',
    active_machine: '',
    numberWithCommas: numberWithCommas,
    getCurrentDate: getCurrentDate,
    dateNow: '2023-02-02',
    setUTCTimeWithTimeZone: setUTCTimeWithTimeZone,
  }),

  created() {
    return dashboardApi.receiptList()
      .then(res => {
        if (res.ret == '0') {
          this.revenue = res.data.amt,
            this.total_transaction = res.data.txCnt,
            this.active_machine = res.data.taCnt
        }
        else {
          this.revenue = '',
            this.total_transaction = '',
            this.active_machine = ''
        }
      })
  },

  methods: {

  },

  computed: {
    ...mapGetters(['getName', 'getLastLogin']),

  }

}
</script>