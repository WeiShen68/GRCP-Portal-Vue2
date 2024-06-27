<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="field"
    :name="validationLabel ? validationLabel : label"
    :vid="vid"
    :rules="rules"
    :disabled="disabled"
    :mode="mode"
  >
    <v-text-field
      ref="textField"
      v-model="inputValue"
      class="input"
      dense
      :append-icon="appendIcon"
      :clearable="clearable"
      :disabled="disabled"
      :error-messages="errors[0]"
      :hide-details="hideDetails"
      :label="label"
      :outlined="outlined"
      :placeholder="placeholder"
      :readonly="readOnly"
      :single-line="singleLine"
      :solo="solo"
      :type="type"
      :min="min"
      :max="max"
      :step="step"
      :suffix="suffix"
      @click:clear="$emit('clearAction')"
      @click:append="$emit('clickAppend')"
      @blur="$emit('blur')"
    ></v-text-field>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'TextField',
  props: {
    appendIcon: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto',
    },
    label: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: 1,
    },
    mode: {
      type: String,
      default: 'passive',
    },
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
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
    step: {
      type: String,
      default: '0',
    },
    singleLine: {
      type: Boolean,
      default: true,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    validationLabel: {
      // for validation error. Eg. Validation error will show without *
      type: String,
      default: '',
    },
    vid: {
      type: String,
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
    focus() {
      this.$refs.textField.focus();
    },
    validate() {
      return this.$refs.field.validate();
    },
  },
};
</script>
<style lang="scss" scoped>
.input.v-text-field--solo::v-deep {
  .v-input__control {
    min-height: 34px !important;
    .v-input__slot {
      // border: 1px solid #c3c3c3;
      box-shadow: none !important;
      margin-bottom: 0px;

      .v-label {
        font-size: 0.875rem;
      }

      input {
        font-size: 0.875rem;
        padding: 4px 0;

        &::placeholder {
          // color: #bbbbbf;
        }
      }
    }
    .v-text-field__details {
      padding: 0px 12px;
      margin-bottom: 2px;
    }
  }
  // &.error--text .v-input__slot {
  //   border: 1px solid var(--error-border-color) !important;
  // }
}
.input.v-text-field--outlined::v-deep {
  .v-input__control {
    .v-input__slot {
      min-height: 38px;
      fieldset {
        border-width: 1px;
      }
      .v-label {
        font-size: 0.875rem;
        top: 9px;
      }
      input {
        font-size: 0.875rem;
      }
    }
    .v-text-field__details {
      padding: 0px 12px;
      margin-bottom: 2px;
    }
  }
}
</style>
