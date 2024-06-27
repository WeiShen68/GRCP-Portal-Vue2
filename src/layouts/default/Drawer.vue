<template>
  <!-- <v-navigation-drawer id="default-drawer" v-model="drawer" :right="$vuetify.rtl" :src="drawerImage ? image : ''"
    :mini-variant.sync="mini" mini-variant-width="80" app width="260" clipped
    :expand-on-hover="$vuetify.breakpoint.mdAndUp" absolute height="100%" style="z-index: 99;"> -->
    <v-navigation-drawer id="default-drawer" v-model="drawer" :src="drawerImage ? image : ''"
    :mini-variant.sync="mini" mini-variant-width="80" app  width="292" 
    :expand-on-hover="$vuetify.breakpoint.mdAndUp" style="z-index: 99;" height="100%">
    <!-- <template v-if="drawerImage" #img="props">
      <v-img :key="image" :gradient="gradient" v-bind="props" />
    </template> -->

    <div class="px-2">
      <default-drawer-header />

      <v-divider class="mx-3 mb-2" />

      <default-list :items="items" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'DefaultDrawer',

  components: {
    DefaultDrawerHeader: () =>
      import(
        /* webpackChunkName: "default-drawer-header" */
        './widgets/DrawerHeader'
      ),
    DefaultList: () =>
      import(
        /* webpackChunkName: "default-list" */
        './List'
      ),
  },

  data: () => ({
    register: false,
  }),

  computed: {
    ...mapState({
      drawerImage: state => state.app.drawerImage,
      items: state => state.app.items,
    }),
    ...mapGetters(['dark', 'gradient', 'image', 'getType']),
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
  },

  created() {
    this.check();
  },

  methods: {
    check() {
      if(this.getType == 2){
        this.register = false
      }
      else{
        this.register = true;
      }
    }
  }
};
</script>

<style lang="scss">
#default-drawer {
  .v-list-item {
    margin-bottom: 0px;
  }

  .section {
    font-weight: 600;
  }

  .sub-section {
    &.v-list-item {
      min-height: 38px;
      // text-decoration: underline;
    }

    .v-list-item__content {
      display: inline-block;
      padding: 8px 0;
    }

    .v-list-item__title {
      border-bottom: 1px dashed #fff;
      display: inline-block;
      padding-bottom: 4px;
    }
  }

  .v-list-item::before,
  .v-list-item::after {
    display: none;
  }

  .v-list-group__header__prepend-icon,
  .v-list-item__icon {
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 4px;
  }

  &.v-navigation-drawer--mini-variant {
    .v-list-item {
      justify-content: flex-start !important;
    }
  }
}
</style>
