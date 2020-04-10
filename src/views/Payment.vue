<template>
    <a-list itemLayout="horizontal" :dataSource="expenses">
        <a-empty
                v-if="expenses.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Sve plaćeno</span>
        </a-empty>
        <a-list-item slot="renderItem" slot-scope="item" :style="{paddingRight: '24px', paddingLeft: $isMobile() ? '16px' : '0px'}">
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
            <a-button type="primary" shape="round" icon="check" @click="markExpenseResolved(item)"
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
  @Action('expenses/fetchExpenses') public fetchAllExpenses;
  @Action('expenses/resolveExpense') public resolveExpense;
  @Getter('expenses/getUnresolvedExpenses') public expenses;

  public markExpenseResolved(model: Expense) {
    EventBus.$emit(EventBusEvents.OpenPopup, {
      options: {
        title: `Plaćeno?`,
        content: model.recurringPayment.name,
        okText: 'Da',
        cancelText: 'Ne',
        onOk: () => {
          this.resolveExpense(model).then(() => {
            model.$delete();
          });
        },
      },
    } as PopupDataInterface);
  }

  public formatDate(dateString: string) {
    return moment(dateString).locale('hr').fromNow();
  }

  private beforeMount() {
    this.fetchAllExpenses();
  }

}
</script>

<style lang="scss" scoped>

</style>
