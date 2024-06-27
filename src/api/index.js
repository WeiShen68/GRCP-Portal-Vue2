import { isUndefinedNullOrEmpty } from '@/util/tools.js';
import { REJECT_CODE } from './rejections/enum';
import { showError } from '@/mixins/common';
import AppStorage from '@/plugins/storage/index.js';
import axios from 'axios';
import Exceptions from './exceptions';
import Rejections from './rejections';
import router from '@/router';
import store from '@/store';

const baseApi = axios.create({
  baseURL: window.env.api.baseUrl,
  timeout: 30000,
});

// const outletApi = axios.create({
//   baseURL: window.env.api.outletUrl,
//   timeout: 30000,
// });

// const userApi = axios.create({
//   baseURL: window.env.api.userUrl,
//   timeout: 30000,
// });

const refreshTokenUrl = '/refresh-token';

const requestHandler = request => {
  let expireTime = store.getters.getExpireTime;
  // console.log('expireTime', expireTime);
  if (expireTime) {
    let lastUpdateTime = store.getters.GETTER_LASTUPDATETIME;
    let activeTime = new Date().getTime() / 1000 - lastUpdateTime;
    // 用户登录还未过期
    // expireTime = 50;
    // console.log('activeTime =>', activeTime);
    if (activeTime < expireTime) {
      // 当token快过期时再去刷新一遍token，保证用户不会掉线
      if (activeTime >= (expireTime / 5) * 4) {

        // 过滤掉刷新token接口，否则会进入死循环
        if (!new RegExp(refreshTokenUrl).test(request.url) && store.getters.getToken) {
          // store.dispatch(actionsType.REFRESH_TOKEN_ACTION);
        }
      }
    }
  } else {
    // console.log('else');
    // 如果激活时间大于等于过期时间，并且当前页面需要登录才能访问，则退出登录
    // console.log('6 长时间未活动');
    if (router.app.$route.meta.requireAuth) {
      store.dispatch('logout_act').then(() => {
        router.replace({ name: 'Login' }).catch();
        window.location.reload(true);
      });
    }
  }

  if (store.getters.getToken) {
    let storageToken = AppStorage.local.get('token');
    // console.log(storageToken)
    // 用户在其他标签页退出了
    if (!storageToken) {
      store.dispatch('logout_act').then(() => {
        router.replace({ name: 'Login' }).catch();
        window.location.reload(true);
      });
    }
    // 让每个请求携带token
    request.headers['Authorization'] = 'Bearer ' + store.getters.getToken;
  }

  // let lang = store.getters.getLang;
  // request.headers['lang'] = 'en_US';
  // request.headers['content-language'] = store.getters.getCurrentLang;
  // request.headers['lang'] = store.getters.getCurrentLang.code;
  return request;
};

const responseHandler = (response, exceptions = null) => {
  try {
    // console.log('response', response)
    // console.log(response.headers['content-type'])

    if (
      response.headers &&
      ('application/pdf' === response.headers['content-type'] ||
      'image/jpeg' === response.headers['content-type'] ||
      'application/xml' === response.headers['content-type']) //'application/json' === response.headers['content-type'] 
    ) {
      return response;
    }

    const responseCode = response.data.ret;
    // const responseCode = 0; //hardcoded

    if (0 != responseCode) {
      // console.log(responseCode, 'code')
      //check if its in common rejections
      const rejection = Rejections.find(item => {
        return item.values.find(code => {
          if (code == responseCode) return code;
        });
      });

      if (!isUndefinedNullOrEmpty(rejection)) {

        if (REJECT_CODE.UNAUTHORISED == rejection.code) {

          store.dispatch('logout_act').then(() => {
            router.replace({ name: 'Login' }).catch();
            if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret))
              // throw `${response.data.ret}: ${response.data.msg}`;
              throw response.data.msg;
          });
        }

        if (REJECT_CODE.WRONGKEY == rejection.code) {

          if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret)) {
            // return Promise.reject(`${response.data.ret}: ${response.data.msg}`);
            return Promise.reject(response.data.msg);
          }
        }
      }

      if (!isUndefinedNullOrEmpty(exceptions)) {

        const exception = exceptions.find(item => {
          if (item.path == response.config.url) return item;
        });

        if (!isUndefinedNullOrEmpty(exception)) {
          const index = exception.values.findIndex(item => {
            if (item == responseCode) return item;
          });
          if (-1 == index) {
            if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret))
              // throw `${response.data.ret}: ${response.data.msg}`;
              throw response.data.msg;
            else showError(response.data);
            throw response.data;
          } else {
            return response.data;
          }
        }
      }

      if (!isUndefinedNullOrEmpty(response.data.msg) && !isUndefinedNullOrEmpty(response.data.ret))

        // throw `${response.data.ret}: ${response.data.msg}`;
        throw response.data.msg;
      throw response.data;
    }
    // console.log(response.data)
    return response.data;
  } catch (error) {
    showError(error);
    return Promise.reject(error);
  }
};

const errorHandler = error => {
  //console.log("errorHandler", error)
  return Promise.reject(error);
};

baseApi.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error)
);
baseApi.interceptors.response.use(
  response => responseHandler(response, Exceptions.Common),
  error => {
    const { response } = error;
    if (response) {
      const data = response.data;
      // console.log ("status",response.status)
      // console.log ("data", data)

      return data;
    }
    return Promise.reject(error);
  }
);

// outletApi.interceptors.request.use(
//   request => requestHandler(request),
//   error => errorHandler(error)
// );
// outletApi.interceptors.response.use(
//   response => responseHandler(response, Exceptions.Common),
//   error => errorHandler(error)
// );

// userApi.interceptors.request.use(
//   request => requestHandler(request),
//   error => errorHandler(error)
// );
// userApi.interceptors.response.use(
//   response => responseHandler(response, Exceptions.Common),
//   error => errorHandler(error)
// );

export default baseApi;
// export { outletApi };
