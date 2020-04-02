<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Shopping" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="showDrawer">
                Dodaj proizvod
            </a-button>
        </template>
        <a-drawer
                title="Odaberi proizvod sa liste"
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
                                :src="item.image ? item.image.path : 'testiram'"
                        />
                    </a-list-item-meta>
                    <div>
                        <a-button type="primary" @click="showChildrenDrawer(index)">
                            Odaberi
                        </a-button>
                    </div>
                </a-list-item>
            </a-list>
            <a-drawer
                    title="Količina"
                    placement="bottom"
                    :closable="false"
                    @close="onChildrenDrawerClose"
                    :visible="childVisible"
                    class="shopping-drawer"
                    :bodyStyle="{ overflow: 'auto', height: '201px' }"
            >
                                <a-list-item>
                                    <a-list-item-meta
                                            :description="chosenItem ? chosenItem.price + ' KN': ''"
                                    >
                                        <span slot="title">{{chosenItem ? chosenItem.name : ''}}</span>
                                        <a-avatar
                                                slot="avatar"
                                                :src="chosenItem ? chosenItem.image.path : 'testiram'"
                                        />
                                    </a-list-item-meta>
                                    <a-input-number id="inputNumber" v-model="value" @change="onChange" />
                                    <a-button type="primary" class="add-button" @click="addItemToList">
                                        Dodaj proizvod
                                    </a-button>
                                </a-list-item>
            </a-drawer>
        </a-drawer>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import GroceryController from '@/api/controllers/GroceryController';
  import GroceryItem from '@/api/models/GroceryItem';
  import ShoppingController from '@/api/controllers/ShoppingController';

  @Component
  export default class ShoppingHeader extends Vue {
    private visible: boolean = false;
    private childVisible: boolean = false;
    private groceryList = [];
    private loadingOverlay = new LoadingOverlayHelper(this, {});
    private chosenItem = null;
    private value = 1;

    public beforeMount() {
      this.loadingOverlay.start();
      GroceryController.fetchAll().then(() => {
        this.loadingOverlay.stop();

        this.groceryList = GroceryItem.query().with('image').limit(10).all();
      });
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
      this.loadingOverlay.start();
      ShoppingController.addGroceryToShoppingList(this.chosenItem).then(() => {
        this.loadingOverlay.stop();
        this.childVisible = false;
        this.visible = false;
      }).catch((error) => {
        console.error(error)
      });
    }
  }
</script>

<style lang="scss">
    .add-button {
        margin-left: 16px;
    }
</style>
