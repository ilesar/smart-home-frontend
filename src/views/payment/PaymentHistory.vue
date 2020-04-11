<template>
    <a-list itemLayout="horizontal" :dataSource="expenses">
        <a-empty
                v-if="expenses.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Nema izvršenih plaćanja</span>
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
            <div>{{ formatDate(item.updatedAt) }}</div>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import ListItem from '@/components/shopping/ListItem.vue';
import moment from 'moment';

@Component({
  name: 'PaymentHistory',
  components: {
    ListItem,
  },
})
export default class History extends Vue {

  @Getter('expenses/getResolvedExpenses')
  private expenses;
  @Action('expenses/fetchResolvedExpenses')
  private fetchResolvedExpenses;

  public beforeMount() {
    this.fetchResolvedExpenses();
  }

  public formatDate(dateString: string) {
    return moment(dateString).locale('hr').calendar();
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
