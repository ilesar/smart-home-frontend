<template>
    <a-row :style="{paddingRight: $isMobile ? '0px' : '24px', margin: '0 24px'}">
        <a-col class="gutter-row" :md="12" :lg="8" :xl="4" v-for="room in rooms" :key="room.id">
            <div class="gutter-box">
                <a-card hoverable @click="goToRoom(room)" :body-style="{ padding: '24px 24px 24px 16px', opacity: room.devices.length > 0 ? '1' : '0.1'}">
                    <a-card-meta :title="room.name" :description="roomDescription(room)">
                        <a-avatar
                                slot="avatar"
                                icon="home"
                                style="color: #FFF; background: #1890ff; margin-top: 3px; margin-right: 5px"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { LoadingOverlayHelper } from '@/helpers/LoadingOverlayHelper';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
import {RouteNames} from '@/enums/RouteNames';
import Room from '@/api/models/Room';

@Component({
  name: 'Devices',
})
export default class Rooms extends Vue {
  @Action('rooms/fetchRooms') private fetchRooms;
  @Getter('rooms/getAllRooms') private rooms;

  private loadingOverlay = new LoadingOverlayHelper(this, {});

  public beforeMount() {
      this.fetchRooms();
  }

  public roomDescription(room: Room) {
      return `${room.devices.length} uređaj${room.devices.length > 1 || room.devices.length === 0 ? 'a' : ''}`;
  }

  private goToRoom(room: Room) {
      this.$router.push(`/${RouteNames.Rooms}/${room.slug}`);
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
</style>
