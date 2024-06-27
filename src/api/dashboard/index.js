import { sanitizeParams } from '@/util/tools';
import Api from '../api';

export const dashboardApi = {

    receiptList(params) {
        return Api.get('merchant/receipt/dash', params)
    },


};