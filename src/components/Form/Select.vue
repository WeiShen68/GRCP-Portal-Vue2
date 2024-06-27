<template>
  <ValidationProvider v-slot="{ errors }" :name="label" :rules="rules" :mode="mode" :disabled="disabled">
    <v-select
      ref="select"
      v-model="inputValue"
      class="input"
      dense
      :clearable="clearable"
      :items="options"
      :label="placeholder ? placeholder : $t('lbl.select')"
      :disabled="disabled"
      :outlined="outlined"
      :append-outer-icon="appendIcon"
      :single-line="singleLine"
      :solo="solo"
      :return-object="returnObj"
      :menu-props="{ offsetY: true }"
      :error-messages="errors[0]"
      :hide-details="hideDetails"
      :item-text="!isUndefinedNullOrEmpty(customFormat) ? customFormat.text : 'text'"
      :item-value="!isUndefinedNullOrEmpty(customFormat) ? customFormat.value : 'value'"
      @change="changeEvt"
      @blur="blurEvt"
    >
      <template v-slot:item="{ item }">
        <span class="selection-text">{{ !isUndefinedNullOrEmpty(customFormat) ? item[customFormat.text] : item.text }}</span>
      </template>
    </v-select>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'Select',
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'passive',
    },
    customFormat: {
      type: Object,
      default: null,
      // Sample on how to pass from parent component -> :custom-format="{ text: 'name', value: 'id' }"
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
    mandatory: {
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
    returnObj: {
      type: Boolean,
      default: false,
    },
    singleLine: {
      type: Boolean,
      default: true,
    },
    solo: {
      type: Boolean,
      default: false,
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
    value: {
      type: [String, Number, Object],
      default: '',
    },
    appendIcon: {
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
.input.v-text-field--solo::v-deep {
  .v-input__control {
    min-height: 38px !important;
    .v-input__slot {
      border: 1px solid #c3c3c3;
      box-shadow: none !important;
      margin-bottom: 0px;

      .v-label {
        color: rgba(0, 0, 0, 0.6);
        font-size: 0.875rem;
      }

      .v-select__selection {
        font-size: 0.875rem;
      }

      .v-input__append-inner {
        .v-input__icon {
          button {
            font-size: 15px;
          }
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
.input.v-text-field--outlined::v-deep {
  .v-input__control {
    .v-input__slot {
      min-height: 38px !important;
      fieldset {
        border-width: 1px;
      }
      .v-select__slot {
        .v-label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.875rem;
          top: 9px;
        }

        .v-select__selection {
          font-size: 0.875rem;
        }

        .v-input__append-inner {
          .v-input__icon {
            button {
              font-size: 15px;
            }
          }
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
