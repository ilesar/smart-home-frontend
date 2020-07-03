<template>
    <a-page-header title="Namirnice" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="createItemMobile" v-if="$isMobile()">
                Nova namirnica MOBILE
            </a-button>
            <a-button type="primary" @click="createItem" v-if="!$isMobile()">
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
import {Action} from 'vuex-class';
import GroceryItemMobileForm from '@/components/forms/GroceryItemMobileForm.vue';

@Component
export default class GroceriesHeader extends Vue {
  @Action('groceries/createGroceryItem')
  private createGroceryItem;
  @Action('images/upload')
  private uploadImage;


  public createItem() {
    EventBus.$emit(EventBusEvents.OpenDrawer, {
      title: 'Nova namirnica',
      model: new GroceryItem(),
      component: GroceryItemForm,
      submitText: 'Spremi',
      onSubmit: (drawer: GroceryItemForm, model: GroceryItem) => {
        this.uploadImage(model.imageForUpload).then((response) => {
          model.imageId = response.response.data.data.id;

          this.createGroceryItem(model).then(() => {
            EventBus.$emit(EventBusEvents.CloseDrawer);
          }).catch((error) => {
            console.log('ERROR CUST');
            console.error(error);
          });
        });
      },
    } as DrawerDataInterface<GroceryItem>);
  }

  public createItemMobile() {
    EventBus.$emit(EventBusEvents.OpenDrawer, {
      title: 'Nova namirnica',
      model: new GroceryItem(),
      component: GroceryItemMobileForm,
      submitText: 'Spremi',
      onSubmit: (drawer: GroceryItemMobileForm, model: GroceryItem) => {
        this.uploadImage(model.imageForUpload).then((response) => {
          model.imageId = response.response.data.data.id;

          this.createGroceryItem(model).then(() => {
            EventBus.$emit(EventBusEvents.CloseDrawer);
          }).catch((error) => {
            console.log('ERROR CUST');
            console.error(error);
          });
        });
      },
    } as DrawerDataInterface<GroceryItem>);
  }
}
</script>

<style lang="scss" scoped>

</style>
