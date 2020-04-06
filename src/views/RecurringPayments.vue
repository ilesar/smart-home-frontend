<template>
    <a-row>
        <a-tabs defaultActiveKey="1" tabPosition="top" :animated="{inkBar: true, tabPane: true}">
            <a-tab-pane tab="Mjesečno" key="1">
                <ItemList
                        :dateSource="recurringPaymentListMonth"
                        @on-delete="deleteItem"
                        @on-edit="editItem"
                />
            </a-tab-pane>
            <a-tab-pane tab="Godišnje" key="2">
                <ItemList
                        :dateSource="recurringPaymentListYear"
                        @on-delete="deleteItem"
                        @on-edit="editItem"
                />
            </a-tab-pane>
            <a-tab-pane tab="Sve" key="3">
                <ItemList
                        :dateSource="recurringPaymentListAll"
                        @on-delete="deleteItem"
                        @on-edit="editItem"
                />
            </a-tab-pane>
        </a-tabs>
    </a-row>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ItemList from '@/components/recurringPayments/ItemList.vue';
  import GroceryItem from '@/api/models/GroceryItem';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
  import RecurringPayment from '@/api/models/RecurringPayment';
  import GroceryItemForm from '@/components/forms/GroceryItemForm.vue';
  import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
  import RecurringPaymentForm from '@/components/forms/RecurringPaymentForm.vue';
  import moment from 'moment';

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
    @Action('recurringpayments/updateRecurringPayment')
    private updateRecurringPayment;
    @Action('recurringpayments/deleteRecurringPayment')
    private deleteRecurringPayment;


    public beforeMount() {
      this.fetchRecurringPaymentList();
    }

    public deleteItem(model: RecurringPayment) {
      EventBus.$emit(EventBusEvents.OpenPopup, {
        options: {
          title: `Sigurno želiš obrisati plaćanje?`,
          content: model.name,
          okText: 'Da',
          cancelText: 'Ne',
          onOk: () => {
            this.deleteRecurringPayment(model).then(() => {
              model.$delete();
            });
          },
        }
      } as PopupDataInterface);
    }

    public editItem(item: RecurringPayment) {
      item.activationTimeDate = moment(item.activationTime);

      EventBus.$emit(EventBusEvents.OpenDrawer, {
        title: 'Uredi plaćanje',
        model: item,
        component: RecurringPaymentForm.name,
        submitText: 'Spremi plaćanje',
        onSubmit: (model: RecurringPayment) => {
          if (model.activationTimeDate) {
            model.activationTime = model.activationTimeDate.format('YYYY-MM-DD HH:mm:ss');
          }

          this.updateRecurringPayment(model).then(() => {
            EventBus.$emit(EventBusEvents.CloseDrawer);
          });
        }
      } as DrawerDataInterface<RecurringPayment>);
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
