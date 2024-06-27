import Api from '../api';
import { sanitizeParams } from '@/util/tools';

export const reportApi = {

    dailySalesByOutlet() {
        return Api.get(`merchant/receipt/tx?listType=31`)
    },

    monthlySalesByOutlet() {
        return Api.get(`merchant/receipt/tx?listType=33`)
    },

    dailySalesByScheme() {
        return Api.get(`merchant/receipt/tx?listType=41`)
    },

    monthlySalesByScheme() {
        return Api.get(`merchant/receipt/tx?listType=43`)
    },

};