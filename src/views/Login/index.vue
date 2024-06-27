<template>
  <div>
    <PlainLayout>
      <div class="box-wrap">
        <div class="title-wrap d-flex justify-center mb-4">
          <span class="login_label">Receipt Server</span>
        </div>
        <div class="title-wrap d-flex justify-center mb-4">
          <v-img lazy-src="@/assets/tms.jpeg" max-height="100" max-width="100" src="@/assets/tms.jpeg"></v-img>
        </div>
        <validation-observer v-slot="{ passes }">
          <form @submit.prevent="submit" class="mt-5">

            <v-row v-if="newUser">
              <!-- if not initialize -->

              <v-col class="mt-n5" cols="12">
                <validation-provider v-slot="{ errors }" name="new password"
                  :rules="{ required: true, regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                  <label class="form-row-col__label">New {{ $t('login.lbl.password') }} </label>
                  <v-text-field required single-line outlined dense v-model="form.newPwd" tabindex="1"
                    :label="$t('login.lbl.password')" :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'" autofocus
                    :type="showPwd2 ? 'text' : 'password'" :error-messages="errors" @click:append="showPwd2 = !showPwd2"
                    @keyup.enter.native="passes(chgPwd)"></v-text-field>
                </validation-provider>
              </v-col>
              <v-col class="mt-n5" cols="12">
                <validation-provider v-slot="{ errors }" name="password"
                  :rules="{ required: true, confirmed: 'new password', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                  <label class="form-row-col__label">Confirm {{ $t('login.lbl.password') }} </label>
                  <v-text-field required single-line outlined dense v-model="cfmPwd" label="Confirm password"
                    :append-icon="showPwd3 ? 'mdi-eye' : 'mdi-eye-off'" tabindex="2"
                    :type="showPwd3 ? 'text' : 'password'" :error-messages="errors" @click:append="showPwd3 = !showPwd3"
                    @keyup.enter.native="passes(chgPwd)"></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col class="py-2" cols="12">
                <validation-provider v-slot="{ errors }" name="Email" rules="required">
                  <label class="form-row-col__label"> {{ $t('login.lbl.email') }} </label>
                  <v-text-field autofocus v-model="form.username" required :error-messages="errors" single-line outlined
                    dense :label="$t('login.lbl.email')"></v-text-field>
                </validation-provider>
              </v-col>
              <v-col class="mt-n5" cols="12">
                <validation-provider v-slot="{ errors }" name="Password"
                  :rules="{ required: true, regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\$%\^&\*])(?=.{8,})' }">
                  <label class="form-row-col__label"> {{ $t('login.lbl.password') }} </label>
                  <v-text-field required single-line outlined dense v-model="form.pwd" :label="$t('login.lbl.password')"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'"
                    :error-messages="errors" @click:append="showPwd = !showPwd"
                    @keyup.enter.prevent="passes(login)"></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-alert type="error" :value="alert"> Incorrect username or password </v-alert>
            <v-alert type="warning" :value="newUserAlert"> Please enter a new password</v-alert>

            <div>
              <v-card outlined color="transparent">
                <v-row class="justify-end">
                  <v-spacer v-if="mobile"></v-spacer>
                  <v-col md="4" sm="4" v-if="newUser">
                    <v-btn block class="text-wrap white--text" color="#3F6AD8" :loading="loading" tabindex="3"
                      @click="passes(chgPwd)">Change Password</v-btn>
                  </v-col>
                  <v-col md="4" sm="4" v-else>
                    <v-btn block class="text-wrap white--text" color="#3F6AD8" :loading="loading"
                      @click="passes(login)">{{ $t('login.btn.login') }}</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </form>
        </validation-observer>
      </div>
    </PlainLayout>
    <v-card>
    </v-card>
  </div>
</template>


<script>
import PlainLayout from '@/layouts/plain/Index.vue';
import { ValidationObserver } from 'vee-validate';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  components: {
    PlainLayout,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      showPwd: false,
      showPwd2: false,
      showPwd3: false,

      form: {
        username: '',
        pwd: '',
        newPwd: '',
      },

      cfmPwd: '',

      alert: false,
      newUser: false,
      newUserAlert: false,
    };
  },
  computed: {
    ...mapState({
      defaultPageAfterLogin: (state) => state.app.defaultPageAfterLogin,
    }),

    mobile() {
      return this.$vuetify.breakpoint.xsAndDown;
    },

    ...mapGetters(['getType']),


  },
  methods: {
    ...mapActions(['login_act', 'processLoginSuccess_act', 'change_pwd_act']),

    async login() {
      const data = {
        ...this.form,
      };
      this.loading = true;
      return this.login_act(data)
        .then(async (res) => {
          this.loading = false;
          if (res.ret == '0') {
            await this.processLoginSuccess_act(res.data);
            if (!sessionStorage.getItem('routeData')) {
              this.navigateReplace(this.defaultPageAfterLogin);
            }
            else {
              this.navigateReplace(sessionStorage.getItem('routeData'));
            }
          }
          else if (res.ret == 'NotInitialized') {
            this.newUser = true;
            this.newUserAlert = true;
          }
          else {
            this.alert = true;
            this.loading = true;
            setTimeout(function () {
              this.alert = false;
              this.loading = false;
            }.bind(this), 3000);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },

    async chgPwd() {
      const data = {
        ...this.form,
      };
      this.loading = true;
      return this.change_pwd_act(data)
        .then(async (res) => {
          this.loading = false;
          if (res.ret == '0') {
            await this.processLoginSuccess_act(res.data);
            this.navigateReplace(this.defaultPageAfterLogin);
          }
          else {
            this.alert = true;
            this.loading = true;
            setTimeout(function () {
              this.alert = false;
              this.loading = false;
            }.bind(this), 3000);
          }

        })
        .catch(() => {
          this.loading = false;
        });
    },
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
  min-height: 34px;
  height: 100% !important;
}
</style>


