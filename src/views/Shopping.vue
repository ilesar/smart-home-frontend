<template>
  <a-list itemLayout="horizontal" :dataSource="shoppingList">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
              :description="item.price + ' KN'"
      >
        <p slot="title">{{item.name}}</p>
        <a-avatar
                slot="avatar"
                :src="item.image ? item.image.path : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/1200px-Red.svg.png'"
        />
      </a-list-item-meta>
      <a-button type="default" shape="round" icon="check">Kupljeno</a-button>
      <a-button type="default" shape="round" icon="delete" style="margin-left: 16px"></a-button>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import ShoppingItem from '@/api/models/ShoppingItem';
  import ShoppingController from '@/api/controllers/ShoppingController';
  import {Action, Getter} from 'vuex-class';


  @Component({
    name: 'Shopping',
    components: {},
  })
  export default class Login extends Vue {

    @Getter('shopping/getShoppingList')
    private shoppingList;
    @Action('shopping/fetchShoppingItemList')
    private fetchShoppingList;
    private loadingOverlay = new LoadingOverlayHelper(this, {});


    public beforeMount() {
      this.fetchShoppingList();
      // this.loadingOverlay.start();
      // ShoppingController.fetchAll().then(() => {
      //   this.loadingOverlay.stop();
      //
      //   this.shoppingList = ShoppingItem
      //     .query()
      //     .with('groceryItem.image')
      //     .all()
      //     .map((shoppingItem: ShoppingItem) => {
      //       return shoppingItem.groceryItem;
      //     });
      //
      // }).catch((error) => {
      //   console.error(error);
      // });
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
