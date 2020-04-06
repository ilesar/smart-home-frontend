<template>
    <a-list itemLayout="horizontal" :dataSource="groceryList">
        <a-list-item slot="renderItem" slot-scope="item, index" style="padding-right: 24px">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.image ? item.image.path : 'testiram'"
                />
            </a-list-item-meta>
            <a-button type="default" shape="round" icon="edit" @click="openDrawer(item)"
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
  import GroceryItemForm from '@/components/forms/GroceryItemForm.vue';

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

    public beforeMount() {
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
        }
      } as PopupDataInterface);
    }

    public openDrawer(item: GroceryItem) {
      EventBus.$emit(EventBusEvents.OpenDrawer, {
        title: 'Uredi namirnicu',
        model: item,
        component: GroceryItemForm.name,
        submitText: 'Spremi plaćanje',
        onSubmit: (drawer: GroceryItemForm, model: GroceryItem) => {
          this.updateGroceryItem(item).then(() => {
            model.$save()
            EventBus.$emit(EventBusEvents.CloseDrawer);
          });
        }
      } as DrawerDataInterface<GroceryItem>);
    }

  }
</script>
