<template>
  <v-fade-transition mode="out-in">
    <v-app>
      <div id="snackbar" class="cxlt-toastr-container toast-top-right"></div>
      <router-view />
      <!-- <BarChart /> -->
    </v-app>
  </v-fade-transition>
</template>

<script>
// Styles
import '@/styles/index.scss';

export default {
  name: 'App',
  metaInfo: {
    title: 'GRCP - PORTAL',
    // titleTemplate: '%s | Material Dashboard Free',
    htmlAttrs: { lang: 'en' },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  },
};
</script>

