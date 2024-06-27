<template>
  <div>
    <!-- mobile version -->
    <v-menu v-if="mobile" offset-y style="z-index: 999" transition="slide-y-transition" nudge-bottom="17"
      nudge-width="250" rounded="pill" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="mobile" class="pr-0 mr-0 transparent" min-width="0" :ripple="false" id="no-background-hover"
          outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn v-else class="transparent mr-3" outlined id="no-background-hover" :ripple="false" min-width="0" text
          v-bind="attrs" v-on="on">
          <v-avatar>
            <img src="@/assets/avatar.png" alt="Error">
          </v-avatar>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list style="overflow: hidden;" class="">
        <div class="mt-1">
          <v-row justify="center">
            <v-col class="text-center">
              <v-btn rounded class="mb-1 float-left ml-3" color="#f7b924" @click="onClick('CHGPWD')">Change Password</v-btn>
              <v-btn rounded color="#444054" class="white--text mb-1 float-right mr-3"
                @click="onClick('LOGOUT')">Logout</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-list>
    </v-menu>

    <!-- desktop version -->
    <v-menu v-else offset-y origin="top right" style=" z-index: 999" transition="slide-y-transition" min-width="25vw"
      nudge-bottom="10" :left="$vuetify.breakpoint.smAndUp">

      <template v-slot:activator="{ on, attrs }">
        <v-btn class="transparent mr-3" outlined id="no-background-hover" :ripple="false" min-width="0" text
          v-bind="attrs" v-on="on">
          <v-avatar>
            <img src="@/assets/avatar.png" alt="John">
          </v-avatar>
          <!-- <v-icon>mdi-chevron-down</v-icon> -->
        </v-btn>
      </template>

      <v-list class="py-7 bg">
        <v-row>
          <v-list-item-avatar size="60" class="ml-8">
            <img src="@/assets/avatar.png" alt="Error" />
            <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <span class="text-truncate white--text">{{ getName }}</span>
            <!-- <span class="white--text">{{ getType }}</span> -->
          </v-list-item-content>
          <v-list-item-action>
            <div class="d-flex mr-8">
              <v-btn rounded class="mr-1" color="#f7b924" @click="onClick('CHGPWD')">Change Password</v-btn>
              <v-btn rounded color="#444054" class="white--text" @click="onClick('LOGOUT')">Logout</v-btn>
            </div>
          </v-list-item-action>
        </v-row>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'DefaultAccount',
  data() {
    return {
      profile: [
        // { type: '', title: 'Profile' },
        // { type: '', title: 'Settings' },
        { divider: true },
        // { type: 'LOGIN', title: this.$t('login.act.login') },
        { type: 'CHGPWD', title: this.$t('login.act.profile') },
        { type: 'LOGOUT', title: this.$t('login.act.logout') },
      ],
      fab: false,
      transition: 'slide-y-reverse-transition',
      hover: false,
      direction: 'bottom',
      closeContent: true,
      closeContent2: false,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['getName', 'getType']),
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    mobileOnly() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions(['logout_act']),

    persist() {
      sessionStorage.routeData = this.$route.name;
    },

    onClick(type) {
      if (!type) {
        return;
      }
      switch (type) {
        case 'CHGPWD':
          this.$router.push('/ResetPassword');
          break;
        case 'LOGOUT':
          this.persist();
          this.logout_act();
          break;
        default:
          break;
      }
    },

   
  },
};
</script>
<style lang="scss" scoped>
.dropdown-item-wrap {
  padding: 0;
}

.dropdown-item {
  padding: 15px 8px;
}

.spacer {
  height: 200vh;
}

#no-background-hover::before {
  background-color: transparent !important;
}

.bg {
  // width: 100%;
  // height: 100%;
  // top: 0;
  // left: 0;
  // background: url('https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg') no-repeat center center;
  // background-size: cover;
  // background-color: #16aaff !important;
  // transform: scale(1.1);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #C04848;
  /* fallback for old browsers */
  background: linear-gradient(rgb(72, 0, 72, 0.8), rgb(192, 72, 72, 0.8)), url("~@/assets/city3.jpeg");
  /* Chrome 10-25, Safari 5.1-6 */
  background-size: cover;
  background-repeat: no-repeat;

}

.no_bg {
  background-color: #0000;
}

.merchant_btn {
  width: 30px !important;
  min-width: 30px !important;
}

// .override-class .v-input {
//   display: inline-block;
//   width: 10px;
// }
</style>