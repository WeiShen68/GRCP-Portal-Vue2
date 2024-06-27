<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="validationLabel ? validationLabel : label"
    :rules="rules"
    :disabled="disabled"
    :mode="mode"
  >
    <v-switch
      v-model="inputValue"
      :label="label"
      :color="color"
      :disabled="disabled"
      :error-messages="errors[0]"
      :hide-details="hideDetails"
      :true-value="trueValue"
      :false-value="falseValue"
      @change="changeEvt"
    ></v-switch>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'SwitchToggle',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    hideDetails: {
      type: [Boolean, String],
      default: 'auto',
    },
    falseValue: {
      default: false,
    },
    mode: {
      type: String,
      default: 'passive',
    },
    rules: {
      type: Object,
      // 'required|email'
      default: () => {
        return {};
      },
    },
    trueValue: {
      default: true,
    },
    value: {
      type: [Boolean, Number],
      default: null,
    },
    validationLabel: {
      // for validation error. Eg. Validation error will show without *
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
  },
};
</script>
<style lang="scss">
.v-input.v-input--selection-controls {
  margin-top: 0px;
}
</style>
