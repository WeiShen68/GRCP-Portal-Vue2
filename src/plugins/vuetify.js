// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ripple from 'vuetify/lib/directives/ripple';
import 'font-awesome/css/font-awesome.min.css';
import colors from 'vuetify/lib/util/colors'
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, { directives: { ripple } });

const theme = {
  primary: '#1867C0',
  // primary: '#E91E63',
  secondary: '#9C27b0',
  accent: '#e91e63',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
};

export default new Vuetify({
  breakpoint: { mobileBreakpoint: 960 },
  icons: {
    values: { expand: 'mdi-menu-down' },
    // iconfont: 'mdi',
  },
  theme: {
    themes: {
      dark: {
        background: colors.red.accent3
      },
      light: {
        success: '#00b300',
        primary: '#0D6EFD',
        secondary: '#6C757D',
        warning: '#FFC107',
        danger: '#DC3545',
        info: '#0DCAF0',
        dark: '#212529',
        alternate: '#794C8A',
        // primary: '#e20074',
        // secondary: '#6c757d',
        // accent: '#3ea2fb',
        // error: '#dc3545',
        // petrol: '#17a499',
        // background: '#BBB7B6',
      },
      options: {
        customProperties: true
    },
    },
  },
});
