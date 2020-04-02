<template>
  <div class="home">
    Shopping
    <a-button type="primary" @click="showDrawer">
      Dodaj proizvod
    </a-button>
    <a-drawer
            title="asd"
            placement="bottom"
            :closable="false"
            @close="onClose"
            :visible="visible"
            class="shopping-drawer"
            :bodyStyle="{ overflow: 'auto', height: '201px' }"
    >
      <a-list itemLayout="horizontal" :dataSource="groceryList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
                  :description="item.price + ' KN'"
          >
            <span slot="title">{{item.name}}</span>
            <a-avatar
                    slot="avatar"
                    :src="item.image ? item.image.image : 'testiram'"
            />
          </a-list-item-meta>
          <div>
            <a-button type="primary" @click="onChoice">
              Dodaj
            </a-button>
          </div>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import GroceryController from '@/api/controllers/GroceryController';
  import GroceryItem from '@/api/models/GroceryItem';
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';

  @Component({
    name: 'Shopping',
    components: {},
  })
  export default class Login extends Vue {

    private visible: boolean = false;
    private groceryList = [];
    private loadingOverlay = new LoadingOverlayHelper(this, {});

    public beforeMount() {
      this.loadingOverlay.start();
      GroceryController.fetchAll().then(() => {
        this.loadingOverlay.stop();

        this.groceryList = GroceryItem.query().with('image').limit(10).all();
        console.log(this.groceryList);
      });
    }

    showDrawer() {
      this.visible = true;
    }
    onClose() {
      this.visible = false;
    }

    onSearch(value) {
      console.log('SEARCHED', value);
    }

    onChoice(value) {
      console.log('CHOICE', value);
    }

    onChange(e) {
      console.log('CHANGE', e);
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

  /*.search-box {*/
  /*  position: -webkit-sticky;*/
  /*  position: sticky;*/
  /*  top: 0;*/
  /*}*/


</style>
