<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240);" title="Kupovina" class="o-section-header">
        <div slot="extra" class="extra-fields" :style="`${$isMobile() ? 'padding: 0' : ''}`">
            <router-link :to="{name: historyRoute }">
                <a-button type="link" @click="">Povijest kupovine</a-button>
            </router-link>

            <a-button type="default" @click="showDrawer">
                Dodaj proizvod
            </a-button>
        </div>
        <a-drawer
                title="Odaberi proizvod sa liste"
                placement="bottom"
                :closable="false"
                @close="onClose"
                :visible="visible"
                wrap-class-name="shopping-item-drawer"
                :bodyStyle="{ overflow: 'auto', height: 'calc(100% - 55px)' }"
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
                    placement="bottom"
                    :closable="false"
                    @close="onChildrenDrawerClose"
                    :visible="childVisible"
                    wrap-class-name="shopping-item-choice-drawer"
                    :bodyStyle="{ overflow: 'auto', height: '201px' }"
            >
                <a-list-item style="margin-bottom: 16px;">
                    <a-list-item-meta
                            :description="chosenItem ? chosenItem.price + ' KN': ''"
                    >
                        <span slot="title">{{chosenItem ? chosenItem.name : ''}}</span>
                        <a-avatar
                                slot="avatar"
                                :src="chosenItem ? chosenItem.image.path : 'testiram'"
                        />
                    </a-list-item-meta>
                </a-list-item>
                <div style="float: right">
                    <a-input-number id="inputNumber" v-model="value" size="large" :min="1"/>
                    <a-button type="primary" class="add-button" @click="addItemToList">
                        <a-icon type="check"></a-icon>
                        Dodaj
                    </a-button>
                </div>

            </a-drawer>
        </a-drawer>
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

  @Getter('groceries/getGroceryItemList')
  private groceryList;
  @Action('groceries/fetchGroceryItemList')
  private fetchGroceryItemList;
  @Action('shopping/addGroceryItemToShoppingList')
  private addGroceryItemToShoppingList;
  @Getter('shopping/getShoppingList')
  private shoppingList;


  public beforeMount() {
    this.fetchGroceryItemList();
  }

  public shoppingEstimate() {
    console.log(this.groceryList);
    return this.shoppingList.reduce((aggregator, groceryItem) => {
      console.log(parseFloat(groceryItem.price));
      return aggregator + parseFloat(groceryItem.price);

    }, 0);
  }

  public showDrawer() {
    this.visible = true;
  }

  public onClose() {
    this.visible = false;
  }

  public showChildrenDrawer(index) {
    this.chosenItem = this.groceryList[index];
    this.childVisible = true;
  }

  public onChildrenDrawerClose() {
    this.childVisible = false;
  }

  public addItemToList() {
    this.addGroceryItemToShoppingList({
      item: this.chosenItem,
      quantity: this.value,
    }).then(() => {
      this.childVisible = false;
      this.value = 1;
    }).catch((error) => {
      alert(error);
    });
  }
}
</script>

<style lang="scss" scoped>
    .add-button {
        margin-left: 16px;
    }

    /*.ant-page-header-heading-extra {*/
    /*    padding: 0 !important;*/
    /*    width: auto !important;*/
    /*}*/

    .ant-drawer.shopping-item-drawer > .ant-drawer-content-wrapper {
        height: 70% !important;
    }

    .ant-drawer.shopping-item-choice-drawer > .ant-drawer-content-wrapper {
        height: 25% !important;
    }

    @media only screen and (max-width: 576px) {
        .ant-drawer.shopping-item-drawer > .ant-drawer-content-wrapper {
            zoom: 0.8;
        }

        .ant-drawer.shopping-item-choice-drawer > .ant-drawer-content-wrapper {
            zoom: 0.8;
        }
    }
</style>
