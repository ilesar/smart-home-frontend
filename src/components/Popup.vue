<template>

</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
  import {ModalOptions} from 'ant-design-vue/types/modal';
  import {PopupType} from '@/enums/PopupType';

  @Component({
    name: 'Popup',
    components: {},
  })
  export default class Popup extends Vue {

    private mounted() {
      EventBus.$on(EventBusEvents.OpenPopup, this.resolvePopup);
    }

    public beforeDestroy() {
      EventBus.$off(EventBusEvents.OpenPopup);
    }

    private resolvePopup(popupDataObject: PopupDataInterface) {
      this.openPopup(popupDataObject.type, popupDataObject.options);
    }

    private openPopup(type: string, options: ModalOptions) {
      switch (type) {
        case PopupType.Success:
          this.$success(options);
          break;
        case PopupType.Warning:
          this.$warning(options);
          break;
        default:
          this.$confirm(options);
      }
    }

  }
</script>

<style lang="scss" scoped>
    .co-popup {

    }
</style>
