<template>
  <v-icon :small="small" :large="large" :size="size" :disabled="disabled">
    {{ icon }}
  </v-icon>
</template>
<script>
export default {
  name: 'IconWrap',
  props: {
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 20,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.v-icon.v-icon.v-icon--disabled {
  color: rgba(0, 0, 0, 0.20) !important;
}
</style>
