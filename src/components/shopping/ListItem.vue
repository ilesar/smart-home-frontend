<template>
    <span class="item-wrapper">
        <a-list-item-meta
                :description="groceryItem.price + ' KN'"
        >
            <p slot="title">{{groceryItem.name}}</p>
            <a-avatar
                    slot="avatar"
                    :src="groceryItem.image ? groceryItem.image.path : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/1200px-Red.svg.png'"
            />
        </a-list-item-meta>
        <a-button type="default" shape="round" icon="check" @click="markShoppingItemBought">Kupljeno</a-button>
        <a-button type="default" shape="round" icon="delete" style="margin-left: 16px" @click="deleteShoppingItem"></a-button>
    </span>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import ShoppingItem from '@/api/models/ShoppingItem';
  import {Action} from 'vuex-class';
  import GroceryItem from '@/api/models/GroceryItem';

  @Component
  export default class ListItem extends Vue {
    @Action('shopping/resolveShoppingItem')
    private resolveShoppingItem;
    @Action('shopping/removeShoppingItem')
    private removeShoppingItem;

    @Prop()
    private model!: ShoppingItem;
    private groceryItem!: GroceryItem;

    private beforeMount() {
      this.groceryItem = this.model.groceryItem;
    }

    public markShoppingItemBought() {
      this.resolveShoppingItem(this.model).then(() => {
        this.model.$delete();
      });
    }

    public deleteShoppingItem() {
      this.removeShoppingItem(this.model).then(() => {
        console.log('FULFILED');
        this.model.$delete();
      });
    }
  }
</script>

<style lang="scss">
    .item-wrapper {
        diplay: block;
    }
</style>
