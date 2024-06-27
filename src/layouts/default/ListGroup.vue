<template>
  <v-list-group :color="gradient !== 1 ? 'primary' : undefined" :group="group" :prepend-icon="item.icon" eager v-bind="$attrs">
    <template v-slot:activator>
      <!-- <v-list-item-icon
        v-if="!item.icon && !item.avatar"
        class="text-caption text-uppercase text-center my-2 align-self-center"
        style="margin-top: 14px"
      >
        {{ title }}
      </v-list-item-icon> -->

      <!-- <v-list-item-avatar v-if="item.avatar">
        <v-img :src="item.avatar" />
      </v-list-item-avatar> -->

      <v-list-item-content v-if="item.title">
        <v-list-item-title class="font-weight-regular ml-3" :class="isFirstLayer && 'section'" v-text="item.title" />
      </v-list-item-content>
    </template>

    <!-- <template v-for="(child, i) in item.items">
      <default-list-group v-if="child.items" :key="`sub-group-${i}`" :item="child"  />

      <default-list-item  v-if="!child.items" :key="`child-${i}`" :item="child"/>
    </template> -->
    <div v-if="!mini">
      <template v-for="(child, i) in item.items">
        <default-list-group class="ml-14" v-if="child.items" :key="`sub-group-${i}`" :item="child" />
        <default-list-item class="ml-14" v-if="!child.items" :key="`child-${i}`" :item="child" />
      </template>
    </div>
  </v-list-group>
</template>

<script>
import { mapState } from 'vuex';
import { MENU_TYPE } from '@/common/enum.js';
export default {
  name: 'DefaultListGroup',

  components: {
    DefaultListItem: () => import('./ListItem'),
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState({
      gradient: state => state.login.drawer.gradient,
    }),
    group() {
      return this.genGroup(this.item.items);
    },
    title() {
      const matches = this.item.title.match(/\b(\w)/g);

      return matches.join('');
    },
    isFirstLayer() {
      return this.item.type == MENU_TYPE.FIRST_LAYER ? true : false;
    },
    mini: {
      get() {
        return this.$store.state.app.mini;
      },
      set(value) {
        this.$store.commit('SET_MINI', value);
      },
    },
  },

  methods: {
    genGroup(items) {
      return items
        .reduce((acc, cur) => {
          // console.log('cur', cur.to.slice(1, -1));
          if (!cur.to) return acc;

          acc.push(cur.items ? this.genGroup(cur.items) : cur.to.slice(1, -1));

          return acc;
        }, [])
        .join('|');
    },
  },
};
</script>
