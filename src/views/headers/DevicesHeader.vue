<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="title" class="o-section-header" @back="goBack"/>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import Room from '@/api/models/Room';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class DevicesHeader extends Vue {

    private room: Room;

    public beforeMount() {
      console.log(this.$route.params.roomSlug);
      this.room = this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);

      if (!this.room) {
        this.$router.push({name: RouteNames.Error});
      }
    }

    public goBack() {
      window.history.back();
    }

    public get title() {
      return `Uređaji u ${this.room.name}`;
    }
  }
</script>

<style lang="scss">

</style>
