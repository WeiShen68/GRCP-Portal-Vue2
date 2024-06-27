<!-- <template >
  <div>
    <v-bottom-navigation color="teal" grow fixed class="hidden-sm-and-up mt-15">
      <v-btn class="botNavBtn" @click="navigatePush('Dashboard')">
        <span> {{ $t('bottom.lbl.dashboard') }} </span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn class="botNavBtn" @click="navigatePush('Merchant')">
        <span>{{$t('bottom.lbl.merchant')}}</span>
        <v-icon>mdi-storefront-outline</v-icon>
      </v-btn>

      <v-menu top :offset-y="offset" content-class="elevation-0" nudge-left="71%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <span>{{$t('bottom.lbl.transaction')}}</span>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="overflow-hidden">
            <v-card width="100%" color="transparent" outlined>
              <v-btn elevation="0" color="grey--light" class="mx-1 black--text font-weight-bold" fab @click="navigatePush('AllTransactions')"> {{$t('bottom.lbl.all')}} </v-btn>
              <v-btn elevation="0" color="grey--light" class="mx-1 black--text font-weight-bold" fab @click="navigatePush('SaleTransactions')"> {{$t('bottom.lbl.sales')}} </v-btn>
              <v-btn elevation="0" color="grey--light" class="mx-1 black--text font-weight-bold" fab @click="navigatePush('RiskTransactions')"> {{$t('bottom.lbl.risk')}} </v-btn>
            </v-card>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn class="botNavBtn" @click="navigatePush('PayoutStatement')">
        <span>{{$t('bottom.lbl.payout')}}</span>
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn class="botNavBtn" @click="navigatePush('Report')">
        <span>{{$t('bottom.lbl.report')}}</span>
        <v-icon>mdi-folder-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </div>
</template>

<script>
export default {
  name: 'DefaultBottomFooter',

  data: () => ({
    offset: true,


  }),

};
</script>

<style scoped>
.v-btn.botNavBtn {
  min-width: 20px !important;
}

.theme--light.v-list {
  background: transparent;
}
</style> -->