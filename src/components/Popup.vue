<template>

</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import {PopupDataInterface} from '@/interfaces/PopupDataInterface';
  import {ModalOptions} from 'ant-design-vue/types/modal';

  @Component({
    name: 'Popup',
    components: {},
  })
  export default class Popup extends Vue {

    private mounted() {
      this.attachEventBusListeners();
    }

    private openPopup(options: ModalOptions) {
      this.$confirm(options);
    }

    private attachEventBusListeners() {
      EventBus.$on(EventBusEvents.OpenPopup, this.openDeleteShoppingItemContent);
    }

    private openDeleteShoppingItemContent(popupOptions: ModalOptions) {
      this.openPopup(popupOptions);
    }

  }
</script>

<style lang="scss" scoped>
    .co-popup {

    }
</style>
