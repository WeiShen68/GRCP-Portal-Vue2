<template>
  <v-list  nav v-bind="$attrs" v-on="$listeners">
    <template v-for="(item, i) in items">
      <default-list-group v-if="item.items" :key="`group-${i}`" :item="item" />

      <default-list-item v-else :key="`item-${i}`" :item="item" />
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'DefaultList',

  components: {
    DefaultListGroup: () => import('./ListGroup'),
    DefaultListItem: () => import('./ListItem'),
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.v-list {
  .v-list-item::v-deep {
    .v-list-item__icon {
      margin-right: 15px;
      min-width: 20px;
    }
  }
  .v-list-group::v-deep {
    .v-list-item__icon {
      margin-right: 15px;
      min-width: 20px;
    }
  }
}
</style>
