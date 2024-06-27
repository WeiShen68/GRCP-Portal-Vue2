// import { isUndefinedNullOrEmpty } from '@/util/tools';
// import { merchantApi, createCorpApi, updateCorpApi, submitAppApi, updateOutletApi } from '@/api/merchant';
// import AppStorage from '@/plugins/storage/index.js';

// const merchant = {
//     state: {
//         list: [],
//         // corpId: [],
//         // outlet: [],
//     },
//     getters: {
//         getInformationList: state => {
//             return state.list ? state.list : AppStorage.local.get('list');
//         },

//         // getCorpId: state => {
//         //     return state.corpId ? state.corpId : AppStorage.local.get('corpId');
//         // },

//         // getOutletList: state => {
//         //     return state.outlet ? state.outlet : AppStorage.local.get('outlet');
//         // },
//     },
//     mutations: {
//         SET_INFORMATION_LIST(state, payload) {
//             state.list = payload;
//         },
//         // SET_CORPID(state, payload) {
//         //     state.corpId = payload;
//         // },

//         // SET_OUTLET_LIST(state, payload) {
//         //     state.outlet = payload;
//         // },
//     },
//     actions: {

//         fetchInformationList({ commit }, params = {}) {
//             return merchantApi.informationList(params).then(res => {
//                 commit('SET_INFORMATION_LIST', res.data);
//             });
//         },
        
//         // create corp pass data to api
//         create_corp_act({ commit, dispatch }, data) {
//             return createCorpApi
//                 .create(data)
//                 .then(async response => {
//                     return response;
//                 })
//                 .catch(error => {
//                     throw error;
//                 });
//         },

//         //update outlet data
//         update_outlet_act({ commit, dispatch }, data) {
//             return updateOutletApi
//                 .update(data)
//                 .then(async response => {
//                     return response;
//                 })
//                 .catch(error => {
//                     throw error;
//                 });
//         },

//         // update
//         // update_act({ commit, dispatch }, data) {
//         //     return updateCorpApi
//         //         .update(data)
//         //         // .then(async response => {
//         //         //     return response;
//         //         // })
//         //         // .catch(error => {
//         //         //     throw error;
//         //         // });
//         // },

//         //submit application
//         submit_app_act({ commit, dispatch }, data){
//             return submitAppApi
//                 .submit(data)
//                 .then(async response => {
//                     return response;
//                 })
//                 .catch(error => {
//                     throw error;
//                 });
//         }

//         // fetchOutletList({ commit }, params = {}) {
//         //     return merchantApi.outletList(params).then(res => {
//         //         commit('SET_OUTLET_LIST', res.data);
//         //     });
//         // },

//     },
// };

// export default merchant;
