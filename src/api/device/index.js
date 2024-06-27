import { sanitizeParams } from '@/util/tools';
import Api from '../api';

export const deviceApi = {

    deviceList(data) {
        return Api.get(`merchant/termacc?listType=1&keyword=${data.search}&page=${data.page}&size=${data.pageSize}`)
    },

    updateDevice(data) {
        data.taId = data.id;
        return Api.post(`merchant/termacc/update`, data)
    },


};