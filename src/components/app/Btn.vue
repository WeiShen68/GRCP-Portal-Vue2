<template>
  <v-btn
    :class="classes"
    :block="block"
    :color="color"
    :disabled="disabled"
    :height="height"
    :loading="loading"
    :small="small"
    :text="text"
    depressed
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'AppBtn',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Array,
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: '38',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
