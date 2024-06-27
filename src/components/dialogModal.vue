<template v-slot:top>
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" max-width="80%" v-model="modalState"
        style="z-index: 999;">

        <v-card :class="{ 'pa-6': $vuetify.breakpoint.mdAndUp }">
            <div class="pt-2 pb-5 pr-7" :class="{ 'pt-6': $vuetify.breakpoint.smAndDown }">
                <v-row>
                    <v-col cols="10" class="">
                        <span class="titles ml-5 float-left">{{ form.txnType }} - {{
                            form.txnTime
                        }}</span>
                    </v-col>
                    <v-col cols="2">
                        <v-btn class="transparent float-right mr-n8" outlined :ripple="false" id="no-background-hover"
                            @click="$emit('close')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>

            <v-card :class="{ 'pa-2': $vuetify.breakpoint.smAndDown }" v-if="mobile">
                <v-card-text>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Plaza</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.plaza" outlined dense hide-details readonly
                                disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Lane</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.lane" outlined dense hide-details readonly
                                disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>MID</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.mid" outlined dense hide-details disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>TID</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.tid" outlined dense hide-details disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Capture Time</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.capTime" outlined dense hide-details disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Transaction Amount</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.txnAmt" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Card Number</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.cardNo" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Card Number (Hashed)</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.cardHashed" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Scheme</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field disabled outlined dense hide-details>
                                <template v-slot:prepend-inner>
                                    <v-chip :color="schemeColor(form.scheme)" small>
                                        {{ schemeText(form.scheme) }}
                                    </v-chip>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>AID</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.aid" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Response Code</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.respCode" disabled outlined dense hide-details single-line class="black--text text--darken-5">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Approval Code</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.apprCode" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>STAN</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.stanNo" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>RRN</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.rrn" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Invoice Number</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.invoiceNo" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center">
                        <v-col cols="3">
                            <v-subheader>Batch Number</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.batchNo" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                
                </v-card-text>
            </v-card>

            <v-card :class="{ 'pa-2': $vuetify.breakpoint.mdAndUp }" v-else>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="4" class="pt-0">
                            <v-subheader>Plaza</v-subheader>
                            <v-text-field v-model="form.plaza" outlined dense hide-details readonly
                                disabled></v-text-field>

                            <v-subheader>Lane</v-subheader>
                            <v-text-field v-model="form.lane" outlined dense hide-details readonly
                                disabled></v-text-field>

                            <v-subheader>MID</v-subheader>
                            <v-text-field v-model="form.mid" outlined dense hide-details disabled></v-text-field>

                            <v-subheader>TID</v-subheader>
                            <v-text-field v-model="form.tid" outlined dense hide-details disabled></v-text-field>

                            <v-subheader>Capture Time</v-subheader>
                            <v-text-field v-model="form.capTime" outlined dense hide-details disabled></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" class="pt-0">
                            <v-subheader>Transaction Amount</v-subheader>
                            <v-text-field v-model="form.txnAmt" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>Card Number</v-subheader>
                            <v-text-field v-model="form.cardNo" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>Card Number (Hashed)</v-subheader>
                            <v-text-field v-model="form.cardHashed" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>Scheme</v-subheader>
                            <v-text-field disabled outlined dense hide-details>
                                <template v-slot:prepend-inner>
                                    <v-chip :color="schemeColor(form.scheme)" small>
                                        {{ schemeText(form.scheme) }}
                                    </v-chip>
                                </template>
                            </v-text-field>

                            <v-subheader>AID</v-subheader>
                            <v-text-field v-model="form.aid" disabled outlined dense hide-details></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" class="pt-0 pb-7">
                            <v-subheader>Response Code</v-subheader>
                            <v-text-field v-model="form.respCode" disabled outlined dense hide-details single-line class="black--text text--darken-5">
                            </v-text-field>

                            <v-subheader>Approval Code</v-subheader>
                            <v-text-field v-model="form.apprCode" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>STAN</v-subheader>
                            <v-text-field v-model="form.stanNo" disabled outlined dense hide-details>
                                <!-- <template v-slot:prepend-inner>
                                    {{ padZero(form.stanNo) }}
                                </template> -->
                            </v-text-field>

                            <v-subheader>RRN</v-subheader>
                            <v-text-field v-model="form.rrn" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>Invoice Number</v-subheader>
                            <v-text-field v-model="form.invoiceNo" disabled outlined dense hide-details></v-text-field>

                            <v-subheader>Batch Number</v-subheader>
                            <v-text-field v-model="form.batchNo" disabled outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script>
import { transactionApi } from '@/api/transaction';
import { setUTCTime, validateRespCode, padZero } from '@/util/tools';


export default {

    name: 'dialogModal',

    props: {
        showModal: Boolean,
        value: Array,
    },

    data: () => ({
        dialog: false,
        form: {
            id: '',
            capTime: '',
            txnTime: '',
            txnType: '',
            mid: '',
            tid: '',
            lane: '',
            cardNo: '',
            cardHashed: '',
            scheme: '',
            aid: '',
            rrn: '',
            txnAmt: '',
            invoiceNo: '',
            stanNo: '',
            respCode: '',
            apprCode: '',
            batchNo: '',
            plaza: '',
            // batchStatus: '',
        },
        setUTCTime: setUTCTime,

    }),

    created() {
        if (this.value[0].id) {
            const data = {
                'id': this.value[0].id,
            }
            return transactionApi.transactionDetailList(data)
                .then(res => {
                    if (res.ret == '0') {
                        this.form.id = res.data.id;
                        this.form.capTime = setUTCTime(res.data.postedDt);
                        this.form.txnTime = setUTCTime(res.data.txDt);
                        this.form.txnType = res.data.txType;
                        this.form.mid = res.data.mid;
                        this.form.tid = res.data.tid;
                        this.form.plaza = res.data.plaza;
                        this.form.lane = res.data.lane;
                        this.form.cardNo = res.data.cardNo
                        this.form.cardHashed = res.data.cardHash
                        this.form.scheme = res.data.scheme
                        this.form.aid = res.data.aid;
                        this.form.rrn = res.data.rrn;
                        this.form.txnAmt = res.data.amt;
                        this.form.invoiceNo = res.data.invNo;
                        this.form.stanNo = padZero(res.data.stan);
                        this.form.respCode = res.data.respCode + ' - ' + validateRespCode(res.data.respCode);
                        this.form.apprCode = res.data.apprCode;
                        this.form.batchNo = padZero(res.data.batchNo);
                    }
                    else {
                        this.form.id = '';
                        this.form.capTime = '';
                        this.form.txnTime = '';
                        this.form.txnType = '';
                        this.form.mid = '';
                        this.form.tid = '';
                        this.form.plaza = '';
                        this.form.cardNo = '';
                        this.form.cardHashed = '';
                        this.form.scheme = '';
                        this.form.aid = '';
                        this.form.rrn = '';
                        this.form.txnAmt = '';
                        this.form.invoiceNo = '';
                        this.form.stanNo = '';
                        this.form.respCode = '';
                        this.form.apprCode = '';
                        this.form.batchNo = '';
                    }
                })
        }
    },

    computed: {
        modalState: {
            get() {
                return this.showModal;
            },
            set() {
                this.$emit('close');
            },
        },

        mobile() {
            return this.$vuetify.breakpoint.smAndDown;
        },
    },

    methods: {


        closeDialog() {
            // this.value = [];
            this.dialog = false
        },





    },


}
</script>

<style lang="scss" scoped>

.v-subheader {
    margin-left: -15px;
    font-size: 0.825rem;
}

.col-3 {
    padding-left: 0px;
    padding-top: 0px;
}

.v-text-field{
    font-size: 0.825rem
}

</style>