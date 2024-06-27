<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="validationLabel ? validationLabel : label"
    :rules="rules"
    :disabled="disabled"
    :mode="mode"
  >
    <v-checkbox
      v-model="inputValue"
      :label="label"
      :disabled="disabled"
      :error-messages="errors[0]"
      :hide-details="hideDetails"
    ></v-checkbox>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Checkbox',
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
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'passive',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: Object,
      default: null,
    },
    validationLabel: {
      // for validation error. Eg. Validation error will show without *
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: null,
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
};
</script>
<style lang="scss">
.v-input {
  .v-input__control {
    .v-label {
      font-size: 14px;
    }
  }
}
</style>
