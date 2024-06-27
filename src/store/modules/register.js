// // Globals
// import { IN_BROWSER } from '@/util/globals';
// import { registerApi } from '@/api/register';
// import AppStorage from '@/plugins/storage/index.js';
// import router from '@/router';
// import { sha256 } from 'js-sha256';
// import jwt from 'jsonwebtoken';

// const register = {
//   state: {
//     // email: '',

//   },
//   getters: {
//     // getUsername: state => {
//     //   return state.username ? state.username : AppStorage.local.get('username');
//     // },
//   },
//   mutations: {
//     // SET_USERNAME(state, payload) {
//     //   state.username = payload;
//     //   payload ? AppStorage.local.set('username', payload) : AppStorage.local.remove('username');
//     // },
//   },
//   actions: {
//     register_act({ commit, dispatch }, data) {
//       return registerApi
//         .register(data)
//         .then(async response => {
//           // let data = response.data;
//           return response;
//         })
//         .catch(error => {
//           throw error;
//         });
//     },
//   },
// };
// export default register;
