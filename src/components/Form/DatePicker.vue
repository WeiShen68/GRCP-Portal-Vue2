<template>
  <div class="wrapper">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <ValidationProvider v-slot="{ errors }" :name="label" :rules="rules" :mode="mode">
          <v-text-field
            v-model="inputValue"
            class="input"
            readonly
            :label="label"
            :hide-details="hideDetails"
            :outlined="outlined"
            :solo="solo"
            :disabled="disabled"
            :placeholder="placeholder"
            :error-messages="errors[0]"
            :single-line="singleLine"
            dense
            v-on="on"
          ></v-text-field>
        </ValidationProvider>
      </template>
      <v-date-picker v-model="inputValue" :disabled="disabled" @input="menu = false"></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'DatePicker',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      // for validation error
      type: String,
      default: '',
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto',
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'passive',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Object,
      // 'required|email'
      default: () => {
        return {};
      },
    },
    singleLine: {
      type: Boolean,
      default: true,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.input.v-text-field--solo::v-deep {
  .v-input__control {
    .v-input__slot {
      border: 1px solid #c3c3c3;
      box-shadow: none;
      margin-bottom: 0px;

      input {
        font-size: 0.875rem;
        padding: 4px 0;
      }
    }
    .v-text-field__details {
      padding: 0px 12px;
      margin-bottom: 2px;
    }
  }
  &.error--text .v-input__slot {
    border: 1px solid var(--error-border-color) !important;
  }
}
.input.v-text-field--outlined::v-deep {
  .v-input__control {
    .v-input__slot {
      min-height: 38px !important;
      fieldset {
        border-width: 1px;
      }
    }
    .v-text-field__details {
      padding: 0px 12px;
      margin-bottom: 2px;
    }
  }
}
</style>
