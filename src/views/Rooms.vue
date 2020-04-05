<template>
    <a-row :gutter="16" style="padding-right: 24px">
        <a-col class="gutter-row" :md="12" :lg="8" :xl="4" v-for="room in rooms">
            <div class="gutter-box">
                <a-card hoverable @click="goToRoom(room)">
                    <a-card-meta :title="room.name" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                icon="home"
                                style="color: #1890ff; background: #FFF"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
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
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  })
  export default class Rooms extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;
    @Getter('rooms/getAllRooms') private rooms;

    private loadingOverlay = new LoadingOverlayHelper(this, {});

    public beforeMount() {
        this.fetchRooms();
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
        padding: 5px 0;
    }
</style>
