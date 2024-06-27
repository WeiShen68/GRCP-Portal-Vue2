export default {
  install(Vue) {
    Vue.prototype.$eb = new Vue();
  },
};
