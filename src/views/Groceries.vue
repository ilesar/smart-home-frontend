<template>
    <a-list itemLayout="horizontal" :dataSource="groceryList">
        <a-list-item slot="renderItem" slot-scope="item, index" :style="{paddingRight: '24px', paddingLeft: $isMobile() ? '24px' : '0px'}">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.image ? item.image.path : 'testiram'"
                />
            </a-list-item-meta>
            <a-button type="default" shape="round" icon="edit" @click="$isMobile() ? editMobileItem(item) : editItem(item)"
                      style="margin-left: 16px">
            </a-button>
            <a-button type="danger" shape="round" icon="delete" @click="deleteItem(item)"
                      style="margin-left: 16px">
            </a-button>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import GroceryItem from '@/api/models/GroceryItem';
import {EventBus} from '@/helpers/EventBusHelper';
import {EventBusEvents} from '@/enums/EventBusEvents';
import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
import GroceryItemMobileFormEdit from '@/components/forms/GroceryItemMobileFormEdit.vue';
import GroceryItemFormEdit from '@/components/forms/GroceryItemFormEdit.vue';

@Component({
  name: 'Groceries',
  components: {},
})
export default class Groceries extends Vue {

  private loadingOverlay = new LoadingOverlayHelper(this, {});

  @Getter('groceries/getGroceryItemList')
  private groceryList;
  @Action('groceries/fetchGroceryItemList')
  private fetchGroceryItemList;
  @Action('groceries/deleteGroceryItem')
  private deleteGroceryItem;
  @Action('groceries/updateGroceryItem')
  private updateGroceryItem;
  @Action('images/upload')
  private uploadImage;

  public async created() {
    this.fetchGroceryItemList();
  }

  public deleteItem(model: GroceryItem) {
    EventBus.$emit(EventBusEvents.OpenPopup, {
      options: {
        title: `Sigurno želiš obrisati namirnicu?`,
        content: model.name,
        okText: 'Da',
        cancelText: 'Ne',
        onOk: () => {
          this.deleteGroceryItem(model).then(() => {
            model.$delete();
          });
        },
      },
    } as PopupDataInterface);
  }

  public editItem(item: GroceryItem) {
    EventBus.$emit(EventBusEvents.OpenDrawer, {
      title: 'Uredi namirnicu',
      model: item,
      component: GroceryItemFormEdit.name,
      submitText: 'Spremi',
      onSubmit: (drawer: GroceryItemFormEdit, model: GroceryItem) => {
        if (model.imageForUpload) {
          this.uploadImage(model.imageForUpload).then((response) => {
            model.imageId = response.response.data.data.id;

            this.updateGroceryItem(model).then(() => {
              EventBus.$emit(EventBusEvents.CloseDrawer);
            }).catch((error) => {
              console.log('ERROR CUST');
              console.error(error);
            });
          });
          return;
        }

        this.updateGroceryItem(model).then(() => {
          EventBus.$emit(EventBusEvents.CloseDrawer);
        }).catch((error) => {
          console.log('ERROR CUST');
          console.error(error);
        });
      },
    } as DrawerDataInterface<GroceryItem>);
  }

  public editMobileItem(item: GroceryItem) {
    EventBus.$emit(EventBusEvents.OpenDrawer, {
      title: 'Uredi namirnicu',
      model: item,
      component: GroceryItemMobileFormEdit.name,
      submitText: 'Spremi',
      onSubmit: (drawer: GroceryItemMobileFormEdit, model: GroceryItem) => {

        if (model.imageForUpload) {
          this.uploadImage(model.imageForUpload).then((response) => {
            model.imageId = response.response.data.data.id;

            this.updateGroceryItem(model).then(() => {
              EventBus.$emit(EventBusEvents.CloseDrawer);
            }).catch((error) => {
              console.log('ERROR CUST');
              console.error(error);
            });
          });
          return;
        }

        this.updateGroceryItem(model).then(() => {
          EventBus.$emit(EventBusEvents.CloseDrawer);
        }).catch((error) => {
          console.log('ERROR CUST');
          console.error(error);
        });
      },
    } as DrawerDataInterface<GroceryItem>);
  }


}
</script>

