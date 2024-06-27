<template>
  <ValidationProvider v-slot="{ errors }" :name="label" :rules="rules" :mode="mode" :disabled="disabled">
    <v-textarea
      ref="input"
      v-model="inputValue"
      class="input"
      dense
      :solo="solo"
      :disabled="disabled"
      :error-messages="errors[0]"
      :hide-details="hideDetails"
      :label="label"
      :outlined="outlined"
      :placeholder="placeholder"
      :readonly="readOnly"
      :rows="rows"
      :single-line="singleLine"
    ></v-textarea>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'TextArea',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto',
    },
    label: {
      // for validation error
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
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 2,
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
      type: [String, Number],
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
      this.$refs.input.focus();
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
      margin-bottom: 2px;

      textarea {
        font-size: 0.875rem;
        margin-top: 3px;
        line-height: 1.6rem;

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
  &.error--text .v-input__slot {
    border: 1px solid var(--error-border-color) !important;
  }
}
.input.v-text-field::v-deep {
  .v-input__control {
    .v-input__slot {
      fieldset {
        border-width: 1px;
      }
    }
  }
}
</style>
