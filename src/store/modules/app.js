import i18n from '@/translations';
import { MENU_TYPE } from '@/common/enum.js';
import { isUndefinedNullOrEmpty } from '@/util/tools';
import AppStorage from '@/plugins/storage/index.js';

const app = {
  state: {
    drawer: null,
    drawerImage: false,
    mini: true,
    items: [
      //dashboard
      {
        type: MENU_TYPE.FIRST_LAYER,
        title: 'Dashboard',
        icon: 'mdi-chart-box-outline',
        to: '/dashboard',
      },
      //transaction
      {
        type: MENU_TYPE.FIRST_LAYER,
        title: 'Transactions',
        icon: 'mdi-credit-card-outline',
        to: '/',
        items: [
          //sales
          {
            type: MENU_TYPE.LOWEST_LAYER,
            title: 'Sales Transactions',
            // icon: 'fa-dot-circle-o',
            to: '/transaction/sales',
          },
          //all
          {
            type: MENU_TYPE.LOWEST_LAYER,
            title: 'All Transactions',
            // icon: 'fa-dot-circle-o',
            to: '/transaction/all',
          },
        ]
      },
      //devices
      {
        type: MENU_TYPE.FIRST_LAYER,
        title: 'Devices',
        icon: 'mdi-cellphone',
        to: '/devices',
      },
      //reports (fa-user-secret)
      {
        type: MENU_TYPE.FIRST_LAYER,
        title: 'Reports',
        icon: 'mdi-note-multiple-outline',
        to: '/reports',
      },
    ],
    currentLang: {},
    pageSizeOpts: [5, 10, 15, 20, 50],
    paginationOpts: {
      page: 1,
      pageSize: 10,
    },
    dateFormat: 'YYYY-MM-DD',
    // defaultPageBeforeLogin: 'Login',
    defaultPageAfterLogin: 'Dashboard',
    notiBadgeLastId: null,
    notiBadgeShow: null,
    imgCompressTo: 0.5, // in MB
    imgMaxLimit: 512000, // in byte. Limit: 500kB

  },

  getters: {

    getCurrentLang() {
      let lang = AppStorage.local.get('lang');
      if (!isUndefinedNullOrEmpty(lang)) {
        return JSON.parse(lang);
      } else {
        lang = JSON.stringify({ code: 'en_US', name: 'English' });
        AppStorage.local.set('lang', lang);
        return lang;
      }
    },
    // getNotiBadgeLastId: state => {
    //   if (!isUndefinedNullOrEmpty(state.notiBadgeLastId)) {
    //     return state.notiBadgeLastId;
    //   } else {
    //     const notiBadgeLastId = AppStorage.local.get('notiBadgeLastId');
    //     return !isUndefinedNullOrEmpty(notiBadgeLastId) ? Number(notiBadgeLastId) : null;
    //   }
    // },
    // getNotiBadgeShow: state => {
    //   if (!isUndefinedNullOrEmpty(state.notiBadgeShow)) {
    //     return state.notiBadgeShow;
    //   } else {
    //     const notiBadgeShow = AppStorage.local.get('notiBadgeShow');
    //     return notiBadgeShow == 'true' ? true : false;
    //   }
    // },
  },
  mutations: {

    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_DRAWER_IMG(state, payload) {
      state.drawerImage = payload;
    },
    SET_MINI(state, payload) {
      state.mini = payload;
    },
    // SET_NOTI_BADGE_LAST_ID(state, payload) {
    //   state.notiBadgeLastId = payload;
    //   AppStorage.local.set('notiBadgeLastId', payload);
    // },
    // SET_NOTI_BADGE_SHOW(state, payload) {
    //   state.notiBadgeShow = payload;
    //   AppStorage.local.set('notiBadgeShow', payload);
    // },
  },
  actions: {
  },
};

export default app;
