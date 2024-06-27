<template>
  <ValidationProvider :name="label" :rules="rules" :mode="mode" v-slot="{ errors }">
    <div class="d-flex flex-wrap">
      <template v-for="(item, index) in options">
        <v-checkbox
          :key="index"
          class="checkbox mt-0 mr-3"
          v-model="inputValue"
          :disabled="disabled"
          :label="!isUndefinedNullOrEmpty(customFormat) ? item[customFormat.text] : item.text"
          :value="!isUndefinedNullOrEmpty(customFormat) ? item[customFormat.value] : item.value"
        ></v-checkbox>
      </template>
    </div>
    <div class="font-12 font-red">{{ errors[0] }}</div>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'CheckboxGroup',
  props: {
    customFormat: {
      type: Object,
      default: null,
      // Sample on how to pass from parent component -> :custom-format="{ text: 'name', value: 'id' }"
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // displayLabel: {
    //   // for display only
    //   type: String,
    //   default: '',
    // },
    label: {
      // for validation error
      type: String,
      default: '',
    },
    mandatory: {
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
    mode: {
      type: String,
      default: 'passive',
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: [String, Array],
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
<style lang="scss" scoped>
.checkbox.v-input::v-deep {
  .v-input__control {
    .v-messages {
      display: none;
    }
  }
}
</style>
