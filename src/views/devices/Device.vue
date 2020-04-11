<template>
    <div style="padding: 24px; text-align: center">
        <a-icon :type="device.deviceType" class="device-icon" style="background: #FFF; color: #1890ff; margin-bottom: 16px"/>
        <h2>{{device ? device.name : ''}}</h2>
        <h1>{{room ? room.name : ''}}</h1>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {RouteNames} from '@/enums/RouteNames';

@Component({
  name: 'Device.vue',
  components: {

  },
})
export default class DeviceConfiguration extends Vue {
  @Action('rooms/fetchRooms') private fetchRooms;

  public beforeMount() {
    this.fetchRooms();
  }

  public get room() {
    return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);
  }

  public get device() {
    return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
  }
}
</script>

<style lang="scss" scoped>
    .device-icon {
        font-size: 50vw;
    }

</style>
