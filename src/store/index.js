import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
// import user from './modules/user';
// import merchant from './modules/merchant';
// import dashboard from './modules/dashboard';
import login from './modules/login';
// import register from './modules/register';
// import verify from './modules/verify';
import lookup from './modules/lookup';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    // user,
    // merchant,
    // dashboard,
    login,
    // register,
    // verify,
    lookup,
  },
});
