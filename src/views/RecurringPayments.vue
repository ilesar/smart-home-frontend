<template>
    <a-row>
        <a-tabs defaultActiveKey="1" tabPosition="top" :animated="{inkBar: true, tabPane: true}">
            <a-tab-pane tab="Mjesečno" key="1">
                <ItemList
                        :dateSource="recurringPaymentListMonth"
                />
            </a-tab-pane>
            <a-tab-pane tab="Godišnje" key="2">
                <ItemList
                        :dateSource="recurringPaymentListYear"
                />
            </a-tab-pane>
            <a-tab-pane tab="Sve" key="3">
                <ItemList
                        :dateSource="recurringPaymentListAll"
                />
            </a-tab-pane>
        </a-tabs>
    </a-row>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ItemList from '@/components/recurringPayments/ItemList.vue';

  @Component({
    name: 'RecurringPayments',
    components: {ItemList},
  })
  export default class RecurringPayments extends Vue {
    @Getter('recurringpayments/getAllRecurringPaymentList')
    private recurringPaymentListAll;
    @Getter('recurringpayments/getMonthlyRecurringPaymentList')
    private recurringPaymentListMonth;
    @Getter('recurringpayments/getYearlyRecurringPaymentList')
    private recurringPaymentListYear;
    @Action('recurringpayments/fetchRecurringPaymentList')
    private fetchRecurringPaymentList;


    public beforeMount() {
      this.fetchRecurringPaymentList();
    }
  }
</script>

<style lang="scss" scoped>
    .ant-tabs-bar, .ant-tabs-bar * {
        position: fixed !important;
        background: red;
        background: blue !important;
    }
</style>
