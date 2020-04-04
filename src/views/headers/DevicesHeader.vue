<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="title" class="o-section-header" @back="goBack"/>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class DevicesHeader extends Vue {

    private room: Room;

    public beforeMount() {
      const roomSlug: string = this.$route.params.roomSlug;
    }

    public goBack() {
      window.history.back();
    }

    public get title() {
      return `Uređaji u ${'asdasd'}`
    }
  }
</script>

<style lang="scss">

</style>
