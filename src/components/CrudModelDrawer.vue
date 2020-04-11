<template>
    <div>
        <a-drawer
                v-if="!$isMobile()"
                :title="drawerObject.title"
                placement="right"
                :closable="false"
                @close="closeDrawer"
                :visible="visible"
                width="50vw"
        >
            <component
                    :is="drawerObject.component"
                    @on-cancel="closeDrawer"
                    :model="drawerObject.model"
                    :submitButtonText="drawerObject.submitText"
                    :submitButtonCallback="drawerObject.onSubmit" />
        </a-drawer>
        <a-drawer
                v-if="$isMobile()"
                :title="drawerObject ? drawerObject.title: ''"
                placement="right"
                :closable="false"
                @close="closeDrawer"
                :visible="visible"
                width="100vw"
                :body-style="{ padding: '0px', width: '100vw'}"
        >
            <component
                    :is="drawerObject ? drawerObject.component : ''"
                    @on-cancel="closeDrawer"
                    :model="drawerObject ? drawerObject.model : ''"
                    :submitButtonText="drawerObject ? drawerObject.submitText : ''"
                    :submitButtonCallback="drawerObject ? drawerObject.onSubmit : ''" />
        </a-drawer>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {EventBus} from '@/helpers/EventBusHelper';
import {EventBusEvents} from '@/enums/EventBusEvents';
import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
import GroceryItemForm from '@/components/forms/GroceryItemForm.vue';
import RecurringPaymentForm from '@/components/forms/RecurringPaymentForm.vue';

@Component
export default class CrudModelDrawer extends Vue {
  private visible: boolean = false;
  private drawerObject: DrawerDataInterface<any> | {} = {};

  public beforeDestroy() {
    EventBus.$off(EventBusEvents.OpenDrawer);
    EventBus.$off(EventBusEvents.CloseDrawer);
  }

  public closeDrawer() {
    this.visible = false;
    setTimeout(() => {
      this.drawerObject = null;
    }, 500);
  }

  public created() {
    const requireComponent = require.context(
      './forms',
      false,
      /[A-Z]\w+\.(vue|js)$/,
    );

    requireComponent.keys().forEach((fileName) => {
      const componentConfig = requireComponent(fileName);
      // Gets the file name regardless of folder depth
      const componentName = fileName
        .split('/')
        .pop()
        .split('.')[0];

      this.$options.components[componentName] = componentConfig.default;
    });
  }

  private mounted() {
    EventBus.$on(EventBusEvents.OpenDrawer, this.resolvePopup);
    EventBus.$on(EventBusEvents.CloseDrawer, this.closeDrawer);
  }

  private resolvePopup(drawerDataObject: DrawerDataInterface<any>) {
    this.visible = true;
    this.drawerObject = drawerDataObject;
  }
}
</script>

<style lang="scss" scoped>

</style>
