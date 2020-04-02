<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import GroceryController from '@/api/controllers/GroceryController';
  import GroceryItem from '@/api/models/GroceryItem';
  import ShoppingItem from '@/api/models/ShoppingItem';
  import ShoppingController from '@/api/controllers/ShoppingController';


  @Component({
    name: 'Shopping',
    components: {},
  })
  export default class Login extends Vue {
    private shoppingList = [];
    private loadingOverlay = new LoadingOverlayHelper(this, {});


    public beforeMount() {
      this.loadingOverlay.start();
      ShoppingController.fetchAll().then(() => {
        this.loadingOverlay.stop();

        this.shoppingList = ShoppingItem.all();
        console.log(this.shoppingList);
      });
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
