<template>
    <a-drawer
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
                :submitButtonText="drawerObject.submitText"
                :submitButtonCallback="drawerObject.onSubmit" />
    </a-drawer>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
  import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';

  @Component
  export default class CrudModelDrawer extends Vue {
    private visible: boolean = false;
    private drawerObject: DrawerDataInterface = {};

    private mounted() {
      EventBus.$on(EventBusEvents.OpenDrawer, this.resolvePopup);
    }

    public beforeDestroy() {
      EventBus.$off(EventBusEvents.OpenDrawer);
    }

    private resolvePopup(drawerDataObject: DrawerDataInterface) {
      this.drawerObject = drawerDataObject;
      this.visible = true;
    }

    closeDrawer() {
      this.visible = false;
    }

    public created() {
      const requireComponent = require.context(
        "./forms",
        false,
        /[A-Z]\w+\.(vue|js)$/
      );

      requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName);
        console.log(componentConfig.default);
        // Gets the file name regardless of folder depth
        const componentName = fileName
          .split("/")
          .pop()
          .split(".")[0];

        this.$options.components[componentName] = componentConfig.default;
      });
    }
  }
</script>

<style lang="scss">

</style>
