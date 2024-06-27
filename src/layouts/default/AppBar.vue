<template>
  <v-app-bar id="default-app-bar" app class="v-bar--underline" color="grey--light" height="60" elevation="0" >
    <!-- :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl" -->
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />

    <v-spacer></v-spacer>

    <!-- <span class="mr-sm-5 text-center">Last Login: {{ setUTCTime(getLastLogin) }}</span> -->

    <v-spacer v-if="mobile"></v-spacer>

    <v-divider v-if="notMobile" vertical></v-divider>

    <default-account />

    <div v-if="notMobile" class="mr-5">
      <span>{{ getName }} </span>
    </div>

  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { setUTCTime } from '@/util/tools';

export default {
  name: 'DefaultBar',

  components: {
    DefaultAccount: () =>
      import(
        /* webpackChunkName: "default-account" */
        './widgets/Account'
      ),
    // DefaultDrawerToggle: () =>
    //   import(
    //     /* webpackChunkName: "default-drawer-toggle" */
    //     './widgets/DrawerToggle'
    //   ),
    // DefaultGoHome: () =>
    //   import(
    //     /* webpackChunkName: "default-go-home" */
    //     './widgets/GoHome'
    //   ),
    // DefaultNotifications: () => import(
    //   /* webpackChunkName: "default-notifications" */
    //   './widgets/Notifications'
    // ),
    // DefaultSearch: () => import(
    //   /* webpackChunkName: "default-search" */
    //   './widgets/Search'
    // ),
  },

  data: () => ({
    offset: true,
    // // 'en_US', 'my_MY', 'zh_CN'
    // items: [
    //   { text: 'English', value: 'en_US' },
    //   { text: 'Malay', value: 'my_MY' },
    //   { text: 'Chinese', value: 'zh_CN' },
    // ],
    setUTCTime: setUTCTime,
    type: true,
    status: '',
  }),

  created() {
    this.checkType();
  },

  methods: {
    checkType() {
      if (this.getType == 2) {
        this.type = false;
        this.status = 'Ongoing';
      }
      else {
        this.type = true;
      }
    },
  },

  computed: {
    ...mapGetters(['getName', 'getLastLogin']),

    notMobile() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    mobile() {
      return this.$vuetify.breakpoint.xs;
    },

    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(value) {
        this.$store.commit('SET_DRAWER', value);
      },
    },
    mini: {
      get() {
        return this.$store.state.app.mini;
      },
      set(value) {
        this.$store.commit('SET_MINI', value);
      },
    },
    name() {
      return this.$t(`route.${this.$route.name}`);
    },
  },
};
</script>

<style>
.override-class .v-input {
  display: inline-block;
  width: 150px;
}
</style>