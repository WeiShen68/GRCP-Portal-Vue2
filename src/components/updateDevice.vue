<template v-slot:top>
    <v-dialog :fullscreen="$vuetify.breakpoint.xs" max-width="50%" v-model="infoModal" style="z-index: 9999;">

        <v-card>
            <v-card class="pa-sm-2">
                <v-card-text>
                    <v-row align="center">
                        <v-col cols="10">
                            <span class="titles pt-4">Device Info</span>
                        </v-col>
                        <v-col cols="2" class="d-flex justify-end">
                            <v-btn class="transparent" fab small outlined @click="$emit('close')" :ripple="false"
                                id="no-background-hover"><v-icon>mdi-close</v-icon></v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="mobile" :class="{ 'pa-2': $vuetify.breakpoint.smAndDown }">
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>ID</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.id" outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>Outlet ID</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.outletId" disabled outlined dense
                                    hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>Outlet</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.outlet" disabled outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>Plaza</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.plaza" outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>Lane</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.lane" outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>Device Name</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.name" outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>MID</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.mid" disabled outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-subheader>TID</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="form.tid" disabled outlined dense hide-details></v-text-field>
                            </v-col>
                        </v-row>
                    </v-row>
                    <v-card v-else>
                        <v-row class="pa-4">
                            <v-col cols="12" md="6" class="pt-0">
                                <v-subheader>ID</v-subheader>
                                <v-text-field v-model="form.id" outlined dense hide-details></v-text-field>

                                <v-subheader>Outlet ID</v-subheader>
                                <v-text-field v-model="form.outletId" disabled outlined dense
                                    hide-details></v-text-field>

                                <v-subheader>Outlet</v-subheader>
                                <v-text-field v-model="form.outlet" disabled outlined dense hide-details></v-text-field>

                                <v-subheader>Plaza</v-subheader>
                                <v-text-field v-model="form.plaza" outlined dense hide-details></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" class="pt-0">
                                <v-subheader>Lane</v-subheader>
                                <v-text-field v-model="form.lane" outlined dense hide-details></v-text-field>

                                <v-subheader>Device Name</v-subheader>
                                <v-text-field v-model="form.name" outlined dense hide-details></v-text-field>

                                <v-subheader>MID</v-subheader>
                                <v-text-field v-model="form.mid" disabled outlined dense hide-details></v-text-field>

                                <v-subheader>TID</v-subheader>
                                <v-text-field v-model="form.tid" disabled outlined dense hide-details></v-text-field>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-card-text>
            </v-card>

            <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="$emit('close')" id="no-background-hover">
                    Close
                </v-btn> -->
                <v-btn color="blue darken-1" text @click="updateDevice(form)" id="no-background-hover">
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { deviceApi } from '@/api/device';

export default {

    name: 'updateDevice',

    props: {
        smolModal: Boolean,
        value: Array,
    },

    data: () => ({
        form: {
            id: '',
            outlet: '',
            outletId: '',
            plaza: '',
            lane: '',
            name: '',
            mid: '',
            tid: '',
        }
    }),

    created() {
        this.form.id = this.value[0].id;
        this.form.outlet = this.value[0].outlet;
        this.form.outletId = this.value[0].outletId;
        this.form.plaza = this.value[0].plaza;
        this.form.lane = this.value[0].lane;
        this.form.name = this.value[0].name;
        this.form.mid = this.value[0].mid;
        this.form.tid = this.value[0].tid;

    },

    computed: {
        infoModal: {
            get() {
                return this.smolModal;
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

        updateDevice(value) {
            const data = value

            return deviceApi.updateDevice(data)
                .then(res => {
                    if (res.ret == '0') {
                        this.$emit('update')
                    }
                    else {
                        alert('Update Failed')
                    }
                })
        }




    },


}
</script>

<style lang="scss" scoped>
.v-subheader {
    margin-left: -15px;
    font-size: 0.825rem;
}

.col-3 {
    padding-top: 0px;
}

.v-text-field {
    font-size: 0.825rem
}
</style>