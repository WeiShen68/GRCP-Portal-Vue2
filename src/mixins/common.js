import Vue from 'vue';
import Toastr from '@/components/Toastr';
import moment from 'moment';
// import AppStorage from '../plugins/storage';
// import i18n from '@/translations';

export default {
  data() {
    return {};
  },
  components: {},
  filters: {
  },
  computed: {
    isMobileView() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  methods: {

    //sale transaction scheme color
    schemeColor(color) {
      if (color === 'TnG') {
        return 'success'
      }
      else if (color === 'Visa') {
        return 'primary'
      }
      else if (color === 'Master') {
        return 'orange'
      }
    },

    //sale transaction scheme text
    schemeText(value) {
      if (value === 'TnG') {
        return 'TNG'
      }
      else if (value === 'Visa') {
        return 'Visa'
      }
      else if (value === 'Master') {
        return 'Master'
      }
    },

    //sales transaction tooltip
    respCodeToolTips(value) {
      if (value == '00') {
        return 'Transaction Approved'
      }
      else if (value == '01') {
        return 'Invalid Credentials Used'
      }
      else if (value == '03') {
        return 'Invalid Service Provider'
      }
      else if (value == '04') {
        return 'Transaction Declined'
      }
      else if (value == '05') {
        return 'Do Not Honour'
      }
      else if (value == '14') {
        return 'Invalid PAN'
      }
      else if (value == '25') {
        return 'Missing Account No'
      }
      else if (value == '30') {
        return 'Format Error'
      }
      else if (value == '46') {
        return 'Velocity Check'
      }
      else if (value == '51') {
        return 'Insufficient Funds'
      }
      else if (value == '54') {
        return 'Card Expired'
      }
      else if (value == '57') {
        return 'Transaction Not Permitted'
      }
      else if (value == '61') {
        return 'Amount Limit Exceeded'
      }
      else if (value == '96') {
        return 'System Malfunction'
      }
      else if (value == 'C4') {
        return 'Host Connection Down'
      }
      else if (value == 'P5') {
        return 'PIN Change/Unblock Request Declined'
      }
      else if (value == 'P9') {
        return 'Invalid STAN'
      }
      else if (value == 'R3' || value == 'R1') {
        return 'Reversal'
      }
      else if (value == 'S1') {
        return 'Settlement'
      }
      else if (value == 'T4' || value == 'T0') {
        return 'Transaction Timeout'
      }
      else {
        return 'Add more error code!'
      }

    },

    padZero(val) {
      return String(val).padStart(6, '0');
    },

    padString(val) {
      if (val == null) {
        return '-'
      }
      else return val
    },

    calcTotal(val){
      
      console.log(val)
      return val
    },

    showInfo(msg) {
      var ComponentClass = Vue.extend(Toastr);
      var instance = new ComponentClass({
        propsData: { title: 'Info', message: msg, type: 'info-purple', icon: 'mdi-info' },
      });
      instance.$mount();
      var snackbarTag = document.getElementById('snackbar');
      snackbarTag.appendChild(instance.$el);
    },
    showSuccess(msg) {
      var ComponentClass = Vue.extend(Toastr);
      var instance = new ComponentClass({
        propsData: { title: 'Success', message: msg, type: 'success' },
      });
      instance.$mount();
      var snackbarTag = document.getElementById('snackbar');
      // snackbarTag.style.maxWidth = "100px";
      snackbarTag.appendChild(instance.$el);
    },
    showError(msg) {
      var ComponentClass = Vue.extend(Toastr);
      var instance = new ComponentClass({
        propsData: { title: 'Error', message: msg, type: 'error' },
      });
      instance.$mount();
      var snackbarTag = document.getElementById('snackbar');
      snackbarTag.appendChild(instance.$el);
    },
    showWarning(msg) {
      var ComponentClass = Vue.extend(Toastr);
      var instance = new ComponentClass({
        propsData: { title: 'Warning', message: msg, type: 'warning' },
      });
      instance.$mount();
      var snackbarTag = document.getElementById('snackbar');
      snackbarTag.appendChild(instance.$el);
    },
    _copySuccess() {
      this.showSuccess(this.$t('success.copy'));
    },
    navigatePush(routeName, params) {
      this.$router.push({ name: routeName, params: { ...params } }).catch(() => { });
    },
    navigateReplace(routeName, params) {
      this.$router.replace({ name: routeName, params: { ...params } }).catch(() => { });
    },
    setPageLoading(value) {
      this.SET_PAGE_LOADING(value);
    },
  },
};

export function showInfo(msg, delay) {
  var ComponentClass = Vue.extend(Toastr);
  var instance = new ComponentClass({
    propsData: { title: 'Info', message: msg, type: 'info-purple', icon: 'mdi-info', delay: delay },
  });
  instance.$mount();
  var snackbarTag = document.getElementById('snackbar');
  snackbarTag.appendChild(instance.$el);
}

export function showSuccess(msg) {
  var ComponentClass = Vue.extend(Toastr);
  var instance = new ComponentClass({
    propsData: { title: 'Success', message: msg, type: 'success' },
  });
  instance.$mount();
  var snackbarTag = document.getElementById('snackbar');
  snackbarTag.appendChild(instance.$el);
}

export function showError(msg) {
  var ComponentClass = Vue.extend(Toastr);
  var instance = new ComponentClass({
    propsData: { title: 'Error', message: msg, type: 'error' },
  });
  instance.$mount();
  var snackbarTag = document.getElementById('snackbar');
  snackbarTag.appendChild(instance.$el);
}

export function showWarning(msg) {
  var ComponentClass = Vue.extend(Toastr);
  var instance = new ComponentClass({
    propsData: { title: 'Warning', message: msg, type: 'warning' },
  });
  instance.$mount();
  var snackbarTag = document.getElementById('snackbar');
  snackbarTag.appendChild(instance.$el);
}
