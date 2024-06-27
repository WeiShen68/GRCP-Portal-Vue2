import Api from '../api';
import { sanitizeParams } from '@/util/tools';

export const loginApi = {

  login(data) {
    const params = sanitizeParams(data)
    return Api.post('merchant/login', params);
  },

  changePwd(data) {
    return Api.post('merchant/setlogin', data);
  },

};

export const changePwdApi = {
  changePwd(data) {
    const params = {
    };
    const headers = {
      Authorization: `Bearer ${data.token}`,
    };
    delete data.token

    return Api.post('merchant/changepassword', data, params, headers);
  },
}