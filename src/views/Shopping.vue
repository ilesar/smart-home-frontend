<template>
    <a-list itemLayout="horizontal" :dataSource="shoppingList">
        <a-empty
                v-if="shoppingList.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Ne treba ništa kupiti</span>
        </a-empty>
        <a-list-item slot="renderItem" slot-scope="item">
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
            <a-button type="default" shape="round" icon="check" @click="markShoppingItemBought(item)"
                      style="margin-left: 16px">Kupljeno
            </a-button>
            <a-button type="default" shape="round" icon="delete" style="margin-left: 16px"
                      @click="deleteShoppingItem(item)"></a-button>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ListItem from '@/components/shopping/ListItem.vue';
  import ShoppingItem from '@/api/models/ShoppingItem';
  import moment from 'moment';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {ModalOptions} from 'ant-design-vue/types/modal';

  @Component({
    name: 'Shopping',
    components: {
      ListItem,
    },
  })
  export default class Shopping extends Vue {

    @Getter('shopping/getShoppingList')
    private shoppingList;
    @Action('shopping/fetchShoppingItemList')
    private fetchShoppingList;
    @Action('shopping/resolveShoppingItem')
    private resolveShoppingItem;
    @Action('shopping/removeShoppingItem')
    private removeShoppingItem;

    public beforeMount() {
      this.fetchShoppingList();
    }

    public markShoppingItemBought(model: ShoppingItem) {
      EventBus.$emit(EventBusEvents.OpenPopup, {
        title: `Nois! Kaj fakat?`,
        content: model.groceryItem.name,
        okText: 'Yup',
        // okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.resolveShoppingItem(model).then(() => {
            model.$delete();
          });
        },
      } as ModalOptions);
    }

    public deleteShoppingItem(model: ShoppingItem) {
      EventBus.$emit(EventBusEvents.OpenPopup, {
        title: `Ne trebamo ovo?`,
        content: model.groceryItem.name,
        okText: 'Nope',
        // okType: 'danger',
        cancelText: 'Kajaznam',
        onOk: () => {
          this.removeShoppingItem(model).then(() => {
            model.$delete();
          });
        },
      } as ModalOptions);

    }

    public formatDate(dateString: string) {
      return moment(dateString).locale('hr').calendar();
    }
  }
</script>

<style lang="scss" scoped>
    .shopping-drawer {
        padding: 0;

        .ant-drawer-body  {
            padding: 0px !important;
        }
    }


</style>
