<template>
    <a-list itemLayout="horizontal" :dataSource="resolvedList">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
                    :description="item.groceryItem.price + ' KN'"
            >
                <p slot="title">{{item.groceryItem.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.groceryItem.image ? item.groceryItem.image.path : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/1200px-Red.svg.png'"
                />
            </a-list-item-meta>
            <div>{{ formatDate(item.updatedAt) }}</div>
            <a-button type="default" shape="circle" style="margin-left: 16px">i</a-button>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class';
  import ListItem from '@/components/shopping/ListItem.vue';
  import moment from 'moment';

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

    public formatDate(dateString: string) {
      // return moment(dateString).locale('hr').format('LL');
      return moment(dateString).locale('hr').calendar();
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
