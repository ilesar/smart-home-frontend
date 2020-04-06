<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Ponavljajuća plaćanja" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="openDrawer()" >
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

  @Component({})
  export default class RecurringPaymentsHeader extends Vue {

    public openDrawer() {
      EventBus.$emit(EventBusEvents.OpenDrawer, {
        title: 'Novo plaćanje',
        component: RecurringPaymentForm.name,
      } as DrawerDataInterface);
    }
  }
</script>

<style lang="scss">

</style>
