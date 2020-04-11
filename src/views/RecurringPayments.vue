<template>
    <a-row>
        <a-tabs defaultActiveKey="1" type="card" tabPosition="top" :animated="{inkBar: true, tabPane: true}">
            <a-tab-pane v-for="(tab, index) in tabs" :tab="`${tab.name} (${tab.dataSource.length})`" :key="index">
                <ItemList
                        :dateSource="tab.dataSource"
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
import {EventBus} from '@/helpers/EventBusHelper';
import {EventBusEvents} from '@/enums/EventBusEvents';
import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
import RecurringPayment from '@/api/models/RecurringPayment';
import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
import RecurringPaymentForm from '@/components/forms/RecurringPaymentForm.vue';
import moment from 'moment';
import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';

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
  @Getter('recurringpayments/getAutomatedRecurringPaymentList')
  private recurringPaymentListAutomated;

  @Action('recurringpayments/fetchRecurringPaymentList')
  private fetchRecurringPaymentList;
  @Action('recurringpayments/updateRecurringPayment')
  private updateRecurringPayment;
  @Action('recurringpayments/deleteRecurringPayment')
  private deleteRecurringPayment;

  private loadingOverlay = new LoadingOverlayHelper(this, {});

  public created() {
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
      },
    } as PopupDataInterface);
  }

  public editItem(item: RecurringPayment) {
    item.activationTimeDate = moment(item.activationTime);

    EventBus.$emit(EventBusEvents.OpenDrawer, {
      title: 'Uredi plaćanje',
      model: item,
      component: RecurringPaymentForm.name,
      submitText: 'Spremi plaćanje',
      onSubmit: (drawer: RecurringPaymentForm, model: RecurringPayment) => {
        if (model.activationTimeDate) {
          console.log('changing date');
          console.log(model.activationTime);
          console.log(model.activationTimeDate);
          console.log(model.activationTimeDate.format('YYYY-MM-DD HH:mm:ss'));
          model.activationTime = model.activationTimeDate.format('YYYY-MM-DD HH:mm:ss');
        }

        this.updateRecurringPayment(model).then(() => {
          EventBus.$emit(EventBusEvents.CloseDrawer);
        });
      },
    } as DrawerDataInterface<RecurringPayment>);
  }

  public get tabs() {
    return [
      {
        name: 'Sve',
        dataSource: this.recurringPaymentListAll,
      },
      {
        name: 'Mjesečno',
        dataSource: this.recurringPaymentListMonth,
      },
      {
        name: 'Godišnje',
        dataSource: this.recurringPaymentListYear,
      },
      {
        name: 'Automatizirano',
        dataSource: this.recurringPaymentListAutomated,
      },
    ];
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
