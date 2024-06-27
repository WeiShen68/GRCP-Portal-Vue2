<!-- <template>
  <div>
    <PlainLayout>
      <div class="box-wrap">
        <div class="title-wrap d-flex justify-center mb-4">

        </div>
        <div class="text-center">
          <span class="form_label_title">{{ $t('resetpwd.lbl.title') }}</span>
        </div>
        <div class="text-center py-2">
          <span class="form_label_subtitle grey--text">{{ $t('resetpwd.lbl.subtitle') }}</span>
        </div>
        <validation-observer ref="observer1" v-slot="{ passes }">
          <v-row>
            <v-col class="pt-5" cols="12">
              <validation-provider v-slot="{ errors }" :name="$t('resetpwd.lbl.email')" rules="required|email">
              <v-text-field autofocus v-model="form.email" required single-line outlined dense :error-messages="errors"
                :label="$t('resetpwd.lbl.email')"></v-text-field>
                </validation-provider>
            </v-col>
          </v-row>
        </validation-observer>
        <v-card outlined color="transparent">
          <v-row class="justify-end">
            <v-spacer v-if="mobile"></v-spacer>
            <v-col md="5" sm="6" class="">
              <v-btn block color="transparent" @click="navigatePush('Login')" outlined
                :class="{ 'pr-0  ml-8': $vuetify.breakpoint.mdAndUp }">
                <a class="text-wrap">{{ $t('resetpwd.btn.back') }}</a>
              </v-btn>
            </v-col>
            <v-col md="5" sm="6">
              <v-btn block class="text-wrap white--text" color="#3F6AD8"> {{ $t('resetpwd.btn.send') }} </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </PlainLayout>
  </div>
</template>


<script>
import PlainLayout from '@/layouts/plain/Index.vue';
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'Login',
  components: {
    PlainLayout,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        email: '',
      },
      // rules: {
      //   email: [
      //     v => !!v || 'E-mail is required',
      //     v => /.+@.+/.test(v) || 'E-mail must be valid',
      //   ],
      // },
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xsAndDown;
    },
  },
  methods: {

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

 -->
