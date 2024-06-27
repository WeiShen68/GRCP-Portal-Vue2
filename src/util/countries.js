import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
// countries.registerLocale(require('i18n-iso-countries/langs/zh.json'));
// countries.registerLocale(require('./countries-zh_TW.json'));
export default class Countries {
  constructor(language) {
    this.language = language;
  }

  get(flag) {
    let data;

    switch (this.language) {
      // case 'zh_CN':
      //   data = countries.getNames('zh');
      //   break;
      // case 'zh_TW':
      //   data = countries.getNames('tw');
      //   break;
      default:
        data = countries.getNames('en');
        break;
    }

    let response = [];
    for (let key in data) {
      response.push({
        text: data[key],
        value: key,
      });
    }

    // if (flag == 1) {
    //   // If flag == 1, then it represent place of issue
    //   response.push({ text: 'UNHCR', value: 'UN' });
    //   response.push({ text: 'Other', value: 'ZZ' });
    // }

    return response;
  }
}
