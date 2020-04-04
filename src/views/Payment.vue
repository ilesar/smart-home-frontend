<template>
    <a-list itemLayout="horizontal" :dataSource="expenses">
        <a-empty
                v-if="expenses.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Ne treba ništa kupiti</span>
        </a-empty>
        <a-list-item slot="renderItem" slot-scope="item" style="padding-right: 24px">
            <a-list-item-meta
                    :description="`${item.recurringPayment.price} kn`"
            >
                <p slot="title">{{item.recurringPayment.name}}</p>
                <a-avatar
                        slot="avatar"
                        :icon="item.recurringPayment.paymentTag"
                        style="color: #1890ff; background: white"
                />
            </a-list-item-meta>
            <div>{{ formatDate(item.dueDate) }}</div>
            <a-button type="primary" shape="round" icon="check" @click="markShoppingItemBought(item)"
                      style="margin-left: 16px">
            </a-button>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ShoppingItem from '@/api/models/ShoppingItem';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
  import moment from 'moment';
  import Expense from '@/api/models/Expense';

  @Component
  export default class Payment extends Vue {
    @Action('expenses/fetchExpenses') fetchAllExpenses;
    @Getter('expenses/getAllExpenses') expenses;

    private beforeMount() {
      this.fetchAllExpenses();
    }

    public markShoppingItemBought(model: Expense) {
      EventBus.$emit(EventBusEvents.OpenPopup, {
        options: {
          title: `Kupljeno?`,
          content: model.recurringPayment.name,
          okText: 'Da',
          cancelText: 'Ne',
          onOk: () => {
            this.resolveShoppingItem(model).then(() => {
              model.$delete();
            });
          },
        }
      } as PopupDataInterface);
    }

    public deleteShoppingItem(model: ShoppingItem) {
      EventBus.$emit(EventBusEvents.OpenPopup, {
        options: {
          title: `Ne trebamo ovo?`,
          content: model.recurringPayment.name,
          okText: 'Ne',
          cancelText: 'Ne znam',
          onOk: () => {
            this.removeShoppingItem(model).then(() => {
              model.$delete();
            });
          },
        }
      } as PopupDataInterface);

    }

    public formatDate(dateString: string) {
      return moment(dateString).locale('hr').fromNow();;
    }

  }
</script>

<style lang="scss">

</style>
