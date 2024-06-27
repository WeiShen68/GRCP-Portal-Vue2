<template>
  <div class="wrapper">
    <ValidationProvider :name="label" :rules="rules" :mode="mode" :disabled="disabled" v-slot="{ errors }">
      <v-autocomplete
        ref="select"
        v-model="inputValue"
        class="input"
        :disabled="disabled"
        :items="options"
        :label="placeholder ? placeholder : $t('labels.plsSelect')"
        :error-messages="errors[0]"
        :outlined="outlined"
        :solo="solo"
        :return-object="returnObj"
        :hide-details="hideDetails"
        :single-line="singleLine"
        dense
        @change="changeEvt"
        @blur="blurEvt"
      ></v-autocomplete>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  name: 'Autocomplete',
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto',
    },
    mode: {
      type: String,
      default: 'passive',
    },
    label: {
      // for validation error
      type: String,
      default: '',
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
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
      default: true,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    returnObj: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Object],
      default: '',
    },
  },
  data() {
    return {};
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
  methods: {
    changeEvt(val) {
      this.$emit('change', val);
    },
    blurEvt(val) {
      this.$emit('blur', val);
    },
    focus() {
      this.$refs.select.focus();
    },
  },
};
</script>
<style lang="scss" scoped>
.input.v-text-field--single-line::v-deep {
  .v-input__control {
    .v-input__slot {
      // border: 1px solid #c3c3c3;
      box-shadow: none;
      margin-bottom: 2px;

      .v-label,
      input {
        font-size: 0.875rem;
      }

      .v-select__selection {
        font-size: 0.875rem;
      }
    }
    .v-text-field__details {
      padding: 0px 12px;
      margin-bottom: 6px;
    }
  }
  &.error--text {
    border: 1px solid var(--error-border-color) !important;
    font-weight: 400;
  }
}
.input.v-text-field--solo::v-deep {
  .v-input__control {
    .v-input__slot {
      border: 1px solid #c3c3c3;
      box-shadow: none;
      margin-bottom: 2px;

      .v-label,
      input {
        font-size: 0.875rem;
      }

      .v-select__selection {
        font-size: 0.875rem;
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
    fieldset {
      border-width: 1px;
    }
    .v-input__slot {
      min-height: 38px;

      .v-select__slot {
        .v-label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.875rem;
          font-weight: 400;
        }

        .v-select__selection {
          font-size: 0.875rem;
        }

        input {
          font-weight: 400;
          font-size: 0.875rem;
        }
      }
    }
  }
  &.error--text .v-input__slot {
    label {
      color: var(--error-text-color);
    }
  }
}
.selection-text {
  font-size: 0.875rem;
}
</style>
