import { isUndefinedNullOrEmpty } from '@/util/tools';
import { lookUpApi } from '@/api/transaction';
import jwt from 'jsonwebtoken';
import AppStorage from '@/plugins/storage/index.js';

const lookup = {
    state: {
        termAcc: []
    },
    getters: {



    },
    mutations: {
        SET_TERM_ACC(state, payload) {
            state.termAcc = payload;
        },
    },
    actions: {
        fetch_termAcc({ commit }, params = {}) {
            return lookUpApi.termAccApi(params).then(res => {
                let list = [];
                for (let item of res.data) {
                    list.push({
                        text: item.name,
                        value: item.id,
                    });
                }
                commit('SET_TERM_ACC', list);
            });
        },
    },
};

export default lookup;


//cache all list & make it multi lingual