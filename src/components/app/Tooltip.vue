<template>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-icon :color="color" v-bind="attrs" v-on="on">
        {{ icon }}
      </v-icon>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    color: {
      type: String,
      default: 'grey darken-2',
    },
    icon: {
      type: String,
      default: 'mdi-information',
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.v-icon {
  font-size: 18px;
}
</style>
