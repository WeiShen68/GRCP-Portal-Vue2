<template>
    <div>
        <PlainLayout>
            <div class="box-wrap">
                <div class="text-center">
                    <span class="font-weight-bold grey--text text-h3">Receipt Server</span>
                </div>
                <div class="text-center">
                    <span class="font-weight-bold grey--text text-h3">Change Password</span>
                </div>
                <div class="text-center py-2">
                    <span class="font-weight-medium text-h4">Fill in old and new password</span>
                </div>
                <validation-observer v-slot="{ invalid, passes }">
                    <form @submit.prevent="submit">
                        <v-row>
                            <v-col class="pt-5 mb-0 pb-0" cols="12">
                                <validation-provider v-slot="{ errors }" name="Password" ref="password"
                                    :rules="{ required: true, regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                                    <label class="form-row-col__label">Enter Old Password</label>
                                    <v-text-field required single-line outlined dense v-model="form.pwd"
                                        :error-messages="errors" label="min 8. alpha-numerics and a special character"
                                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" autofocus tabindex="1"
                                        :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd">
                                    </v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <validation-provider v-slot="{ errors }" name="New password"
                                    :rules="{ required: true, regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                                    <label class="form-row-col__label"> Enter New password </label>
                                    <v-text-field required single-line outlined dense v-model="form.newPwd"
                                        :error-messages="errors" label="min 8. alpha-numerics and a special character" tabindex="2"
                                        :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @keyup.enter.native="passes(reset)" :type="showPwd2 ? 'text' : 'password'"
                                        @click:append="showPwd2 = !showPwd2">
                                    </v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12" class="pt-0">
                                <validation-provider v-slot="{ errors }" name="password"
                                    :rules="{ required: true, confirmed: 'New password', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                                    <label class="form-row-col__label"> Enter New password </label>
                                    <v-text-field required single-line outlined dense v-model="cfmPwd"
                                        :error-messages="errors" label="min 8. alpha-numerics and a special character" tabindex="3"
                                        :append-icon="showPwd3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @keyup.enter.native="passes(reset)" :type="showPwd3 ? 'text' : 'password'"
                                        @click:append="showPwd3 = !showPwd3">
                                    </v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row>
                    </form>

                    <v-card outlined color="transparent">
                        <v-row>
                            <v-col cols="6">
                                <v-btn block @click="navigatePush('Dashboard')">
                                    <a class="text-wrap">Back</a>
                                </v-btn>
                            </v-col>
                            <v-col cols="66">
                                <v-btn block class="text-wrap white--text" color="#3F6AD8" :loading="loading"
                                    @click="reset" :disabled="invalid" tabindex="3"> Change password </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </validation-observer>
            </div>
        </PlainLayout>

        <v-snackbar v-model="snackbar" centered color="green accent-5"> <span class="d-flex justify-center">{{
            text
        }}</span></v-snackbar>
        <v-snackbar :timeout="timeout" v-model="snackbarFailed" centered color="red accent-5"> <span
                class="d-flex justify-center black--text">{{ failed }}</span></v-snackbar>
    </div>
</template>


<script>
import PlainLayout from '@/layouts/plain/Index.vue';
import { ValidationProvider } from 'vee-validate';
import { mapActions, mapGetters, mapState } from 'vuex';
import { regex } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate';

extend('regex', {
    ...regex,
    message: '{_field_} must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and min 8 characters',
})

export default {
    name: 'Login',
    components: {
        PlainLayout,
        ValidationProvider,
    },
    data() {
        return {
            form: {
                pwd: '',
                newPwd: '',
            },

            cfmPwd: '',

            showPwd: false,
            showPwd2: false,
            showPwd3: false,

            snackbar: false,
            text: 'You have successfully reset your password.',
            loading: false,

            snackbarFailed: false,
            failed: 'Invalid old password',
            timeout: 2000,

        };
    },
    computed: {
        mobile() {
            return this.$vuetify.breakpoint.xsAndDown;
        },

        ...mapGetters(['getToken']),
    },
    methods: {
        ...mapActions(['reset_pwd_act']),

        async reset() {
            const data = {
                ...this.form,
                'token': this.getToken
            };
            this.loading = true;
            return this.reset_pwd_act(data)
                .then(async (res) => {
                    if (res.ret == '0') {
                        this.snackbar = true;
                        setTimeout(function () {
                            this.loading = false
                            this.snackbar = false;
                            this.navigateReplace('Dashboard')
                        }.bind(this), 1000);
                    }
                    else {
                        this.snackbarFailed = true;
                        this.loading = false
                    }
                })
        }
    },
};
</script>
<style lang="scss" scoped>
.box-wrap {
    background-color: white;
    border-radius: 8px;
    max-width: 500px;
    padding: 30px;
    width: 100%;
    z-index: 1;
}

.title-wrap {
    font-size: 32px;
}



::v-deep .v-btn__content {
    display: contents !important;
}

.v-btn {
    min-height: 40px;
    height: 100% !important;
}
</style>


