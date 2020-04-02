<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Povijest kupovine" @back="goBackToShopping" class="o-section-header">
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import {Action, Getter} from 'vuex-class';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class ShoppingHeader extends Vue {
    private visible: boolean = false;
    private childVisible: boolean = false;
    private loadingOverlay = new LoadingOverlayHelper(this, {});
    private chosenItem = null;
    private value = 1;
    private readonly historyRoute = RouteNames.ShoppingHistory;

    @Getter('shopping/getGroceryItemList')
    private groceryList;
    @Action('shopping/fetchGroceryItemList')
    private fetchGroceryItemList;
    @Action('shopping/addGroceryItemToShoppingList')
    private addGroceryItemToShoppingList;
    @Getter('shopping/getShoppingList')
    private shoppingList;

    public goBackToShopping() {
      this.$router.push({name: RouteNames.Shopping});
    }

    public beforeMount() {
      this.fetchGroceryItemList()
    }

    shoppingEstimate() {
      console.log(this.groceryList);
      return this.shoppingList.reduce((aggregator, groceryItem) => {
        console.log(parseFloat(groceryItem.price));
        return aggregator + parseFloat(groceryItem.price);

      }, 0);
    }

    showDrawer() {
      this.visible = true;
    }

    onClose() {
      this.visible = false;
    }

    showChildrenDrawer(index) {
      this.chosenItem = this.groceryList[index];
      this.childVisible = true;
    }

    onChildrenDrawerClose() {
      this.childVisible = false;
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

    addItemToList() {
      this.addGroceryItemToShoppingList(this.chosenItem).then(() => {
        this.childVisible = false;
        this.visible = false;
      }).catch((error) => {
        alert(error);
      });
    }
  }
</script>

<style lang="scss">
    .add-button {
        margin-left: 16px;
    }
</style>
