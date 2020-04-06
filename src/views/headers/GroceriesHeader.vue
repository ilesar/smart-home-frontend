<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Namirnice" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="openDrawer" >
                Nova namirnica
            </a-button>
        </template>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
  import GroceryItem from '@/api/models/GroceryItem';
  import GroceryItemForm from '@/components/forms/GroceryItemForm.vue';

  @Component
  export default class GroceriesHeader extends Vue {
    public openDrawer() {
      EventBus.$emit(EventBusEvents.OpenDrawer, {
        title: 'Nova namirnica',
        component: GroceryItemForm.name,
        submitText: 'Spremi namirnicu',
        onSubmit: (model: GroceryItem) => {
          console.log('form submitted');
          console.log(model);
        }
      } as DrawerDataInterface);
    }
  }
</script>

<style lang="scss">

</style>
