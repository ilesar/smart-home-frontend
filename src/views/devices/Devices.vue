<template>
    <a-row :style="{paddingRight: $isMobile ? '0px' : '24px', margin: '0 24px'}">
        <a-empty
                v-if="devices.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Nema uređaja u ovoj sobi</span>
        </a-empty>
        <a-col class="gutter-row" :md="12" :lg="8" :xl="4" v-for="device in devices" :key="device.id">
            <div class="gutter-box">
                <a-card hoverable @click="goToDevice(device)" :body-style="{padding: '24px 24px 24px 16px'}" :class="!device.configuration ? 'disabled' : ''">
                    <a-card-meta :title="device.name" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                :icon="device.deviceType"
                                style="background: #FFF; color: #1890ff; margin-top: 3px; margin-right: 5px"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {RouteNames} from '@/enums/RouteNames';
import Device from '@/api/models/Device';

@Component({
  name: 'Devices',
})
export default class Devices extends Vue {
  @Action('rooms/fetchRooms') private fetchRooms;

  public beforeMount() {
      this.fetchRooms();
  }

  public get room() {
    return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);
  }

  public get devices() {
    return this.room ? this.room.devices : [];
  }

  private goToDevice(device: Device) {
    this.$router.push(`/${RouteNames.Rooms}/${this.room.slug}/devices/${device.slug}`);
  }

}
</script>

<style lang="scss" scoped>
    .gutter-example >>> .ant-row > div {
        background: transparent;
        border: 0;
    }
    .gutter-box {
        /*background: #00a0e9;*/
        padding: 4px 0;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }

</style>
