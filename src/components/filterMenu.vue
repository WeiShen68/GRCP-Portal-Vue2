<template v-slot:top>
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" max-width="70%" v-model="modalState2" style="z-index: 999;">
        <v-card class="pa-6">
            <v-list class="pt-sm-0" :class="{ 'px-4': $vuetify.breakpoint.xs }">
                <v-list-item>
                    <v-list-item-content class="table_label">
                        Search Criteria
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                        <v-btn class="transparent" fab small outlined @click="$emit('close')" :ripple="false"
                            id="no-background-hover"><v-icon>mdi-close</v-icon></v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-card class="pa-4">
                <v-list class="pt-0">
                    <v-list-item>
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="12" md="6" sm="6" class="">
                                    From Date
                                    <v-menu v-model="menu" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="form.startDate" prepend-inner-icon="mdi-calendar"
                                                outlined dense @click:clear="clearDate" readonly single-line
                                                v-bind="attrs" v-on="on" hide-details clearable></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.startDate" @input="menu = false">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="12" md="6" sm="6" class="">
                                    To Date
                                    <v-menu v-model="menu2" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="form.endDate" prepend-inner-icon="mdi-calendar"
                                                outlined dense @click:clear="clearDate2" readonly single-line
                                                v-bind="attrs" v-on="on" hide-details clearable></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.endDate" @input="menu2 = false">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="12" md="6" sm="6">
                                    Card Last 4 Digit
                                    <v-text-field v-model.trim="form.cardLast4" outlined dense hide-details single-line
                                        @keyup.enter="filterInput(form); $emit('close');" @click:clear="clearMessage"
                                        clearable></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" sm="6">
                                    Terminal Account
                                    <v-autocomplete :items="termAccList" v-model.trim="form.taId" outlined dense
                                        cache-items hide-details single-line clearable>

                                    </v-autocomplete>
                                </v-col>

                                <v-col cols="12" md="6" sm="6" class="mt-3">
                                    <v-btn @click="filterInput(form)" class="success">
                                        <v-icon small class="mr-1">mdi-magnify</v-icon> Search
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
        {{termAccList}}
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {

    name: 'filterMenu',

    props: {
        showModal2: Boolean,
        stored_filter_data: Object,
    },

    data: () => ({

        // getCurrentDate: getCurrentDate,
        // timeSince: timeSince,

        checked: false,

        menu: false,
        menu2: false,

        form: {
            startDate: '',
            endDate: '',
            taId: '',
            cardLast4: '',
        },
        filterValues: [],

        time: null,
        timemenu: false,
    }),

    created() {
        this.fetch_termAcc();

        if (this.stored_filter_data && this.stored_filter_data != null) {
            this.form.cardLast4 = this.stored_filter_data.cardLast4
            this.form.taId = this.stored_filter_data.taId
        }
    },

    methods: {
        ...mapActions(['fetch_termAcc']),

        filterInput(value) {
            value.date_time = value.endDate
            if (value.endDate) {
                value.endDate = value.endDate + ' 23:59:59'
            }
            this.filterValues = value;
            this.$emit('filterInput', this.filterValues)
            this.$emit('close')
        },

        clearMessage() {
            this.form.cardLast4 = ''
        },

        clearDate() {
            this.form.startDate = '';
        },

        clearDate2() {
            this.form.endDate = '';
        },

    },

    computed: {
        ...mapGetters(['getToken']),

        ...mapState({
            termAcc: state => state.lookup.termAcc,
        }),

        termAccList() {
            return this.termAcc;
        },

        modalState2: {
            get() {
                return this.showModal2;
            },
            set() {
                this.$emit('close');
            },
        },
    }


}
</script>

<style lang="scss" scoped>
.v-text-field {
    margin-top: 12px;
}

.v-card {
    overflow-y: hidden;
}
</style>