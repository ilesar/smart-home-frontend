<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Konfiguracija proizvoda" class="o-section-header" @back="goBack">

    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import Room from '@/api/models/Room';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class DevicesHeader extends Vue {
    private visible: boolean = false;


    showDrawer() {
      this.visible = true;
    }

    onClose() {
      this.visible = false;
    }

    public get room() {
      return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug)
    }

    public goBack() {
      window.history.back();
    }

    public get title() {
      if (!this.room) {
        return '';
      }
      return `Uređaji u ${this.room.name}`;
    }
  }
</script>

<style lang="scss">

</style>
