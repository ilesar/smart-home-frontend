<template>
    <p>{{device ? device.name : ''}} - {{room ? room.name : ''}}</p>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action} from 'vuex-class';
  import {RouteNames} from '@/enums/RouteNames';

  @Component({
    name: 'DeviceConfiguration',
    components: {

    },
  })
  export default class DeviceConfiguration extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;

    public beforeMount() {
      this.fetchRooms();
    }

    public get room() {
      return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug)
    }

    public get device() {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug)
    }
  }

</script>

<style lang="scss" scoped>


</style>
