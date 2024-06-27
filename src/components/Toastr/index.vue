<template>
  <transition
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
  >
    <div v-if="show" class="toast" :class="['toast-' + type]" :style="{ backgroundColor: toastBackgroundColor }">
      <button v-if="closeButton" class="toast-close-button" role="button" @click="hideToastr">x</button>
      <div v-if="progressBar" class="toast-progress" :style="'width: 50px' + progress.percent + '%'"></div>
      <div class="toast-icon">
        <img v-if="!icon" :src="iconSrc" alt="" />
        <v-icon v-if="icon" color="white">{{ icon }}</v-icon>
      </div>
      <!-- <div :class="special ? 'toast-title-special' : 'toast-title'">{{ title }}</div> -->
      <div class="d-flex justify-space-between">
        <div class="flex-column">
          <div class="toast-title">{{ title }}</div>
          <!-- <button></button> -->
          <div v-if="useHtml" class="toast-message" v-html="message"></div>
          <div v-else class="toast-message" v-text="message"></div>
        </div>
        <div v-if="special" class="flex-column align-self-center">
          <v-btn class="ma-2" tile outlined color="white" :loading="loading" @click="callback">
            <v-icon left>mdi-link</v-icon> Go
          </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CxltToastr',
  props: {
    type: {
      type: String,
      default: 'success',
    },
    position: {
      type: String,
      default: 'top center',
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: Object,
      default: () => ({}),
      // type: String,
      // default: '',
    },
    useHtml: {
      type: Boolean,
      default: false,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
    progressBar: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    timeOut: {
      type: String,
      default: '5500',
    },
    showMethod: {
      type: String,
      default: 'fadeIn',
    },
    hideMethod: {
      type: String,
      default: 'fadeOut',
    },
    showDuration: {
      type: String,
      default: '300',
    },
    hideDuration: {
      type: String,
      default: '1000',
    },
    delay: {
      type: String,
      default: '0',
    },
    successColor: {
      type: String,
      default: '',
    },
    infoColor: {
      type: String,
      default: '',
    },
    warningColor: {
      type: String,
      default: '',
    },
    errorColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    special: {
      type: Boolean,
      default: false,
    },
    routeParam: {
      type: Object,
      default: null,
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },
  data: () => {
    return {
      progress: {
        hideEta: 0,
        percent: 0,
        intervalId: null,
      },
      show: false,
      defaultIcons: {
        success: require('./assets/success.png'),
        info: require('./assets/info.png'),
        warning: require('./assets/warning.png'),
        error: require('./assets/error.png'),
      },
      loading: false,
    };
  },
  computed: {
    positionClass() {
      return this.position.split(' ').join('-');
    },
    enterActiveClass() {
      return 'animated ' + this.showMethod;
    },
    leaveActiveClass() {
      return 'animated ' + this.hideMethod;
    },
    toastBackgroundColor() {
      if (this.color) {
        return this.color;
      } else {
        if (this.type === 'success' && this.successColor) {
          return this.successColor;
        } else if (this.type === 'info' && this.infoColor) {
          return this.infoColor;
        } else if (this.type === 'warning' && this.warningColor) {
          return this.warningColor;
        } else if (this.type === 'error' && this.errorColor) {
          return this.errorColor;
        }
        return null;
      }
    },
    iconSrc() {
      if (this.icon) return this.icon;
      return this.defaultIcons[this.type];
    },
  },
  beforeMount() {
    let toastContainer = document.querySelector(`.cxlt-toastr-container.toast-${this.positionClass}`);
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      // 分2次添加，是为了兼容IE10
      toastContainer.classList.add('cxlt-toastr-container');
      toastContainer.classList.add(`toast-${this.positionClass}`);
      document.body.appendChild(toastContainer);
    }
    // toastContainer.appendChild(this.$el)
  },
  mounted() {
    setTimeout(() => this.showToastr(), this.delay);
  },
  methods: {
    showToastr() {
      this.show = true;
      this.sto = setTimeout(() => this.hideToastr(), this.timeOut);
      if (this.progressBar) {
        this.progress.hideEta = new Date().getTime() + parseFloat(this.timeOut);
        this.progress.intervalId = setInterval(() => this.refreshProgress(), 10);
      }
    },
    hideToastr() {
      clearTimeout(this.sto);
      clearTimeout(this.progress.intervalId);
      this.show = false;
    },
    refreshProgress() {
      this.progress.percent = ((this.progress.hideEta - new Date().getTime()) / this.timeOut) * 100;
    },
    beforeEnter(el) {
      el.style.animationDuration = this.showDuration + 'ms';
    },
    afterEnter() {
      this.$el.classList.add('animated');
      this.$el.classList.add(this.showMethod);
    },
    beforeLeave(el) {
      el.style.animationDuration = this.hideDuration + 'ms';
    },
    goToPatientDetails() {
      this.loading = true;
      const params = {
        patientId: this.routeParam.patientId,
        medId: this.routeParam.medId,
      };
      this.navigatePush('PIIPatientProfile', params);
    },
  },
};
</script>
<style lang="css">
@import './assets/toastr.css';
</style>
