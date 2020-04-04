<template>
    <a-list itemLayout="horizontal" :dataSource="recurringPaymentList">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :icon="item.paymentTag"
                        style="color: #1890ff; background: white"
                />
            </a-list-item-meta>
            <a-badge status="success" text="Automatizirano" v-if="item.isAutomated"/>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';

  @Component({
    name: 'RecurringPayments',
    components: {},
  })
  export default class RecurringPayments extends Vue {
    @Getter('recurringpayments/getRecurringPaymentList')
    private recurringPaymentList;
    @Action('recurringpayments/fetchRecurringPaymentList')
    private fetchRecurringPaymentList;


    public beforeMount() {
      this.fetchRecurringPaymentList();
    }
  }
</script>

<style lang="scss" scoped>

</style>
