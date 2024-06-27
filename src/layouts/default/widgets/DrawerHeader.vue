<template>
  <v-list-item class="mb-0 justify-space-between pl-3">

    <v-list-item-content>
      <v-list-item-title class="text-h4">
        <!-- <strong v-if="mini" class="mr-1 font-weight-black orange--text"></strong> -->
        <v-img v-if="mini" lazy-src="@/assets/tms.jpeg" class="ml-1" max-height="36" max-width="36" src="@/assets/tms.jpeg"></v-img>
        <strong v-else class="d-flex justify-center mr-1 font-weight-black orange--text">Receipt Server</strong>
      </v-list-item-title>
    </v-list-item-content>


  </v-list-item>
</template>

<script>
export default {
  name: 'DefaultDrawerHeader',

  computed: {
    mini: {
      get() {
        return this.$store.state.app.mini;
      },
      set(value) {
        this.$store.commit('SET_MINI', value);
      },
    },
  },
};
</script>
