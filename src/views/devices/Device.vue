<template>
    <div style="padding: 24px; text-align: center">
        <a-card hoverable style="margin-bottom: 16px; background: #1890ff; padding-top: 8px">
<!--            <template class="ant-card-actions" slot="actions">-->
<!--                <a-icon type="setting" key="setting" />-->
<!--                <a-icon type="edit" key="edit" />-->
<!--                <a-icon type="ellipsis" key="ellipsis" />-->
<!--            </template>-->
            <a-icon :type="device ? device.deviceType : 'close'" class="device-icon" style="background: #1890ff; color: #FFF; margin-bottom: 16px"/>
            <h2 style="color: #FFF">{{device ? device.name : ''}}</h2>
            <h1 style="color: #FFF">{{room ? room.name : ''}}</h1>
        </a-card>
        <a-card hoverable v-if="device && device.configuration" style="text-align: left" title="Konfiguracijski detalji" :head-style="{background: '#EEE'}">
            <a-list itemLayout="horizontal" :dataSource="device.configuration.items">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta :description="item.description"
                    >
                        <a slot="title" href="https://www.antdv.com/">{{item.name}}</a>
<!--                        <a-avatar-->
<!--                                slot="avatar"-->
<!--                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
<!--                        />-->
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-card>

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
