// import { isUndefinedNullOrEmpty } from '@/util/tools';
// import { dashboardApi } from '@/api/dashboard';
// import AppStorage from '@/plugins/storage/index.js';

// const dashboard = {
//   state: {
//     dashboardList: [],
//     terminalList: [],
//   },
//   getters: {
//     getDashboardList: state => {
//       return state.dashboardList ? state.dashboardList : AppStorage.local.get('dashboardList');
//     },
//     getTerminalList: state => {
//       return state.terminalList ? state.terminalList : AppStorage.local.get('terminalList');
//     },
//   },
//   mutations: {
//     SET_DASHBOARD_LIST(state, payload) {
//       state.dashboardList = payload;
//     },
//     SET_TERMINAL_LIST(state, payload) {
//       state.terminalList = payload;
//     },
//   },
//   actions: {

//     fetchDashboardList({ commit }, params = {}) {
//       return dashboardApi.list(params).then(res => {
//         commit('SET_DASHBOARD_LIST', res.data);
//       });
//     },
//     fetchTerminalList({ commit }, params = {}) {
//       return dashboardApi.terminalList(params).then(res => {
//         commit('SET_TERMINAL_LIST', res.data);
//       });
//     },
//     //merchant/list

//   },
// };

// export default dashboard;
