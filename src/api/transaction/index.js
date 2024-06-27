import Api from '../api';
import { sanitizeParams } from '@/util/tools';

export const transactionApi = {

    salesTransactionList(data) {

        const params = data.value
        delete params.date_time
        if (params) {
            let str = 'merchant/receipt/tx?listType=2' +
            Object.keys(params)
                .filter(function (key) { return params[key] })
                .map(function (key) { return '&' + key + '=' + params[key] }).join('&');
            return Api.get(str + `&page=${data.page}&size=${data.pageSize}`)
        }

        return Api.get(`merchant/receipt/tx?listType=2&page=${data.page}&size=${data.pageSize}`)

    },

    allTransactionList(data) {
        const params = data.value
        delete params.date_time

        if (params) {
            let str = 'merchant/receipt/tx?listType=1' +
            Object.keys(params)
                .filter(function (key) { return params[key] })
                .map(function (key) { return '&' + key + '=' + params[key] }).join('&');

            return Api.get(str + `&page=${data.page}&size=${data.pageSize}`)
        }

        return Api.get(`merchant/receipt/tx?listType=1&page=${data.page}&size=${data.pageSize}`)
    },

    transactionDetailList(data) {
        data = sanitizeParams(data)
        return Api.get(`merchant/receipt/tx?listType=9&id=${data.id}`)
    },
};

export const lookUpApi = {
    termAccApi(data) {
        return Api.get(`merchant/lookup/list?cat=TermAcc`, data)
    }
}