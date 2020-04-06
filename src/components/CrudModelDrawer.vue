<template>
    <a-drawer
            :title="drawerTitle"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            width="50vw"
    >
        <component :is="drawerComponent" @on-close="onClose" />
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
    private drawerComponent: Component = null;
    private drawerTitle: string = '';

    private mounted() {
      EventBus.$on(EventBusEvents.OpenDrawer, this.resolvePopup);
    }

    public beforeDestroy() {
      EventBus.$off(EventBusEvents.OpenDrawer);
    }

    private resolvePopup(drawerDataObject: DrawerDataInterface) {
      this.drawerComponent = drawerDataObject.component;
      this.drawerTitle = drawerDataObject.title;
      this.visible = true;
    }

    onClose() {
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
