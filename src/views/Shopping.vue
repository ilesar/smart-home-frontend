<template>
  <a-list itemLayout="horizontal" :dataSource="shoppingList">
      <list-item slot="renderItem" slot-scope="item, index" :model="item"></list-item>
  </a-list>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class';
  import ListItem from '@/components/shopping/ListItem.vue';

  @Component({
    name: 'Shopping',
    components: {
      ListItem,
    },
  })
  export default class Shopping extends Vue {

    @Getter('shopping/getShoppingList')
    private shoppingList;
    @Action('shopping/fetchShoppingItemList')
    private fetchShoppingList;

    public beforeMount() {
      this.fetchShoppingList();
    }

  }
</script>

<style lang="scss" scoped>
  .shopping-drawer {
    padding: 0;

    .ant-drawer-body {
      padding: 0px !important;
    }
  }


</style>
