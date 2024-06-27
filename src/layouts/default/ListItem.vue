<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    :to="isSubSection ? '' : item.to"
    active-class="primary white--text"
    :link="isSubSection ? false : true"
    :class="['py-1', isSubSection ? 'sub-section' : '']"
    v-bind="$attrs"
    v-on="$listeners"

  >
    <!-- <v-list-item-icon v-if="!item.icon" class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center">
      {{ title }} 
    </v-list-item-icon> -->

    <!-- <v-list-item-avatar v-if="item.avatar">
      <v-img :src="item.avatar" />
    </v-list-item-avatar> -->

    <!-- nav-drawer-icon :class="{ 'ml-2': MENU_TYPE.LOWEST_LAYER }" -->
    <v-list-item-icon v-if="item.icon && (isFirstLayer || mini)" class="my-2 ml-2 align-self-center" >
      <v-icon size="18px"  v-text="item.icon" :class="{ 'custom-icon': MENU_TYPE.LOWEST_LAYER }" />
      <!-- <i class="fa" :class="[item.icon]" aria-hidden="true"></i> -->
    </v-list-item-icon>

    <!-- nav-drawer-text -->
    <v-list-item-content v-if="item.title && !mini" >
      <v-list-item-title :class="{ 'ml-0': isFirstLayer && 'section'}" v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { MENU_TYPE } from '@/common/enum.js';
export default {
  name: 'DefaultListItem',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    mini: {
      get() {
        return this.$store.state.app.mini;
      },
      set(value) {
        this.$store.commit('SET_MINI', value);
      },
    },
    title() {
      const matches = this.item.title.match(/\b(\w)/g);
      return matches.join('');
    },
    isFirstLayer() {
      return this.item.type == MENU_TYPE.FIRST_LAYER ? true : false;
    },
    isSubSection() {
      return this.item.type == MENU_TYPE.SUB_SECTION ? true : false;
    },
    MENU_TYPE() {
      return MENU_TYPE;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-icon {
  font-size: 18px;
  margin-right: 10px;
}
</style>