import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enUS from './en';
import zhCN from './zh';
import myMY from './my';

import ar from "vee-validate/dist/locale/ar.json";
import en from "vee-validate/dist/locale/en.json";

import './rules';

Vue.use(VueI18n);

let messages = {
  en_US: {
    ...enUS,
    // fields: {
    // //     ...enUS,
    //     email: "E-mail",
    // //     password: "Password"
    //   },
    
    // validation: en.messages
  },
  zh_CN: {
    ...zhCN,
  },
  my_MY: {
    ...myMY,
  },
  //  ar: {
  //   fields: {
  //     email: "البريد الاليكتروني",
  // //     password: "كلمة السر"
  //   },
  //   validation: ar.messages
  // // }
  //  }
};

const i18n = new VueI18n({
  locale: 'en_US',
  fallbackLocale: 'en_US', // set fallback locale - if english fails shows MY instead.
  messages,
  silentTranslationWarn: true,
});


export default i18n;
