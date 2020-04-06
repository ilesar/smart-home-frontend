<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Ponavljajuća plaćanja" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="createItem()" >
                Novo plaćanje
            </a-button>
        </template>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
  import RecurringPaymentForm from '@/components/forms/RecurringPaymentForm.vue';
  import RecurringPayment from '@/api/models/RecurringPayment';
  import {Action} from 'vuex-class';

  @Component
  export default class RecurringPaymentsHeader extends Vue {
    @Action('recurringpayments/createRecurringPayment')
    private createRecurringPayment;

    public createItem() {
      EventBus.$emit(EventBusEvents.OpenDrawer, {
        title: 'Novo plaćanje',
        model: new RecurringPayment(),
        component: RecurringPaymentForm.name,
        submitText: 'Spremi',
        onSubmit: (model: RecurringPayment) => {
          if (model.activationTimeDate) {
            model.activationTime = model.activationTimeDate.format('YYYY-MM-DD HH:mm:ss');
          }

          this.createRecurringPayment(model).then(() => {
            EventBus.$emit(EventBusEvents.CloseDrawer);
          });
        }
      } as DrawerDataInterface<RecurringPayment>);
    }
  }
</script>

<style lang="scss">

</style>
