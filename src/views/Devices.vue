<template>
    <a-row :gutter="16" style="padding-right: 24px">
        <a-empty
                v-if="room.devices.length === 0"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :imageStyle="{height: '60px'}"
        >
            <span slot="description">Nema uređaja u ovoj sobi</span>
        </a-empty>
        <a-col class="gutter-row" :md="12" :lg="8" :xl="4" v-for="device in room.devices">
            <div class="gutter-box">
                <a-card hoverable @click="">
                    <a-card-meta :title="device.name" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                icon="home"
                                style="background: #1890ff"
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
  import Room from '@/api/models/Room';

  @Component({
    name: 'Devices',
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  })
  export default class Devices extends Vue {
    private room: Room;

    private loadingOverlay = new LoadingOverlayHelper(this, {});

    public beforeMount() {
      this.room = this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);

      if (!this.room) {
        console.warn('didnt find room');
      }
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
