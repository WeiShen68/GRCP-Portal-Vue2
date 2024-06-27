
import { loginApi,changePwdApi } from '@/api/login';
import AppStorage from '@/plugins/storage/index.js';
import router from '@/router';
import jwt from 'jsonwebtoken';
const md5 = require('md5');

const login = {
    state: {
        dark: false,
        drawer: {
            image: 0,
            gradient: 0,
            mini: false,
        },
        gradients: [
            'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
            'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
            'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)',
        ],
        token: null,
        expireTime: null,
        email: '',
        lang: '',
        name: '',
        phone: null,
        userId: '',
        country: '',
        type: '',
        timezone: null,
        last_login: null,
        // username: '',

    },
    getters: {
        dark: (state, getters) => {
            return state.dark || getters.gradient.indexOf('255, 255, 255') === -1;
        },
        gradient: state => {
            return state.gradients[state.drawer.gradient];
        },
        getToken: state => {
            return state.token ? state.token : AppStorage.local.get('token');
        },
        getExpireTime: state => {
            return state.expireTime ? state.expireTime : AppStorage.local.get('expireTime');
        },
        getEmail: state => {
            return state.email ? state.email : AppStorage.local.get('email');
        },
        getLanguage: state => {
            return state.lang ? state.lang : AppStorage.local.get('lang');
        },
        getName: state => {
            return state.name ? state.name : AppStorage.local.get('name');
        },
        getPhone: state => {
            return state.phone ? state.phone : AppStorage.local.get('phone');
        },
        getUserId: state => {
            return state.userId ? state.userId : AppStorage.local.get('userId');
        },
        getCountry: state => {
            return state.country ? state.country : AppStorage.local.get('country');
        },
        getType: state => {
            return state.type ? state.type : AppStorage.local.get('type');
        },
        getTimezone: state => {
            return state.timezone ? state.timezone : AppStorage.local.get('timezone');
        },
        getLastLogin: state => {
            return state.last_login ? state.last_login : AppStorage.local.get('last_login');
        },
    },
    mutations: {
        SET_GRADIENT(state, payload) {
            state.drawer.gradient = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
            payload ? AppStorage.local.set('token', payload) : AppStorage.local.remove('token');
        },
        SET_EXPIRETIME(state, payload) {
            state.expireTime = payload;
            payload ? AppStorage.local.set('expireTime', payload) : AppStorage.local.remove('expireTime');
        },
        SET_EMAIL(state, payload) {
            state.email = payload;
            payload ? AppStorage.local.set('email', payload) : AppStorage.local.remove('email');
        },
        SET_LANGUAGE(state, payload) {
            state.lang = payload;
            payload ? AppStorage.local.set('lang', payload) : AppStorage.local.remove('lang');
        },
        SET_NAME(state, payload) {
            state.name = payload;
            payload ? AppStorage.local.set('name', payload) : AppStorage.local.remove('name');
        },
        SET_PHONE(state, payload) {
            state.phone = payload;
            payload ? AppStorage.local.set('phone', payload) : AppStorage.local.remove('phone');
        },
        SET_USERID(state, payload) {
            state.userId = payload;
            payload ? AppStorage.local.set('userId', payload) : AppStorage.local.remove('userId');
        },
        SET_COUNTRY(state, payload) {
            state.country = payload;
            payload ? AppStorage.local.set('country', payload) : AppStorage.local.remove('country');
        },
        SET_TYPE(state, payload) {
            state.type = payload;
            payload ? AppStorage.local.set('type', payload) : AppStorage.local.remove('type');
        },
        SET_TIMEZONE(state, payload) {
            state.timezone = payload;
            payload ? AppStorage.local.set('timezone', payload) : AppStorage.local.remove('timezone');
        },
        SET_LASTLOGIN(state, payload) {
            state.last_login = payload;
            payload ? AppStorage.local.set('last_login', payload) : AppStorage.local.remove('last_login');
        },
    },
    actions: {
        login_act({ commit, dispatch }, data) {
            data.pwd = md5(data.pwd);
            return loginApi
                .login(data)
                .then(async response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        },

        processLoginSuccess_act({ commit }, data) {

            const decodedJwt = jwt.decode(data.token);

            commit('SET_TOKEN', data.token);
            commit('SET_EXPIRETIME', decodedJwt.exp);
            commit('SET_EMAIL', data.email);
            // commit('SET_LANGUAGE', data.lang);
            commit('SET_NAME', data.name);
            commit('SET_PHONE', data.phone);
            // commit('SET_USERID', data.userid);
            // commit('SET_COUNTRY', data.country);
            // commit('SET_TYPE', decodedJwt.type);
            commit('SET_TIMEZONE', data.timezone);
            commit('SET_LASTLOGIN', data.lastLogin);

            return data;
        },

        change_pwd_act({ commit, dispatch }, data) {
            data.pwd = md5(data.pwd);
            data.newPwd = md5(data.newPwd);
            return loginApi
                .changePwd(data)
                .then(async response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        },

        reset_pwd_act({ commit, dispatch }, data) {
            data.pwd = md5(data.pwd);
            data.newPwd = md5(data.newPwd);
            return changePwdApi
                .changePwd(data)
                .then(async response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        },
        
        logout_act({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                commit('SET_EXPIRETIME', '');
                commit('SET_EMAIL', '');
                commit('SET_LANGUAGE', '');
                commit('SET_NAME', '');
                commit('SET_PHONE', '');
                commit('SET_USERID', '');
                commit('SET_COUNTRY', '');
                commit('SET_TYPE', '');
                commit('SET_TIMEZONE', '');

                router.replace({ name: 'Login' }).catch();
                return resolve();
            });
        },

    }
};

//   jwt data
//   exp : 1704954393 
//   iat : 1673418393 
//   type : 2 
//   userId : 100003 
//   username : "testingtestemail12345@gmail.com"
//   -->

export default login;
