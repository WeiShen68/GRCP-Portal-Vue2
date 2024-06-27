import { localize, extend } from 'vee-validate';

import en from 'vee-validate/dist/locale/en.json';
// import zh from 'vee-validate/dist/locale/zh_CN.json';

import './custom';

localize('en', en.messages);

import en_common from './commons/en';
import zh_common from './commons/zh';

import en_labels from '../en';
import zh_labels from '../zh';

import en_rules from './en';
import zh_rules from './zh';

/*let lang = store.getters.getLang;
if(!lang || !lang.code){
  // lang = tool.getBrowserLang();
  if(/\w+-(\w+)/.test(lang)){
    let arr = lang.split("-");
    arr[1] = RegExp.$1.toUpperCase();

    lang = arr.join("_");
    arr = null;
  }
}else{*/
let lang = 'en_US';
/*}*/

let common, labels, messages;

switch (lang) {
  case 'en_US':
    common = en_common;
    messages = en_rules;
    // labels = lowercase(en_labels);
    labels = en_labels;
    break;
  case 'zh_CN':
    common = zh_common;
    messages = zh_rules;
    labels = zh_labels;
    break;
}

let obj = {
  messages: {
    ...common,
  },
  names: {
    ...labels,
  },
  fields: {
    ...messages,
  },
};

const translate = {
  en: obj,
  cn: obj,
};

switch (lang) {
  case 'en_US':
    localize('en', translate.en);
    break;
  case 'zh_CN':
    localize('zh_CN', translate.cn);
    break;
}

export function changeLang(code) {
  lang = code;
  switch (lang) {
    case 'en_US':
      common = en_common;
      messages = en_rules;
      // labels = lowercase(en_labels);
      labels = en_labels;
      break;
    case 'zh_CN':
      common = zh_common;
      messages = zh_rules;
      labels = zh_labels;
      break;
  }

  let obj = {
    messages: {
      ...common,
    },
    names: {
      ...labels,
    },
    fields: {
      ...messages,
    },
  };

  const translate = {
    en: obj,
    cn: obj,
  };
}

export default translate;
