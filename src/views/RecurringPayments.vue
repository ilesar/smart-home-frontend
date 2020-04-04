<template>
    <a-list itemLayout="horizontal" :dataSource="recurringPaymentList">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.image ? item.image.path : 'testiram'"
                />
            </a-list-item-meta>
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
