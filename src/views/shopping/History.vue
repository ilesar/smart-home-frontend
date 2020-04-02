<template>
    <a-list itemLayout="horizontal" :dataSource="resolvedList">
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
  export default class History extends Vue {

    @Getter('shopping/getResolvedList')
    private resolvedList;
    @Action('shopping/fetchResolvedItemList')
    private fetchResolvedItemList;

    public beforeMount() {
      this.fetchResolvedItemList();
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
