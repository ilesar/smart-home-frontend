<template>
    <div style="padding: 0px;" ref="configcard">
        <a-card :bordered="false" class="configuration-card"
                :body-style="{padding: '0', height: !$isMobile() ? 'calc(100vh - 129px)' : 'calc(100vh - 65px)', overflowY: 'scroll'}">
            <template slot="title" style="line-height: 32px">
                <a-affix :target="() => this.$refs.configcard">
                    Konfiguracija
                    <a-button type="primary" :class="{disabled: !configurationChanged}"
                              style="float: right; margin-left: 16px">Spremi
                    </a-button>
                    <a-button :class="{disabled: !configurationChanged}" style="float: right">Spremi kao novu</a-button>
                </a-affix>

            </template>
            <a-list itemLayout="horizontal" :dataSource="currentConfiguration.items">
                <a-list-item slot="renderItem" slot-scope="configurationItem" style="padding: 16px 24px">
                    <a-list-item-meta :title="configurationItem.name"
                                      :description="!$isMobile() ? configurationItem.description : ''"></a-list-item-meta>
                    <a slot="actions">
                        <a-icon type="highlight"></a-icon>
                        copy
                    </a>
                    <a slot="actions">
                        <a-icon type="copy"></a-icon>
                        paste
                    </a>
                    <a slot="actions">
                        <a-icon type="unordered-list"></a-icon>
                        copy to all
                    </a>
                    <a slot="actions">
                        <component :is="getConfigurationItemInput(configurationItem)" :ref="'picker'+configurationItem.id"
                                   @on-change="(value) => onItemChange(value, configurationItem)"></component>
                    </a>

                </a-list-item>
            </a-list>
        </a-card>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';
  import ColorInputGroup from '@/components/devices/inputs/ColorInputGroup.vue';
  import ConfigurationItem from '@/api/models/ConfigurationItem';
  import {DeviceInputType} from '@/enums/DeviceInputType';
  import Configuration from '@/api/models/Configuration';

  const mqtt = require('mqtt');

  @Component({
    name: 'Device.vue',
    components: {
      ColorInputGroup,
      ColorInput,
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  })
  export default class DeviceConfiguration extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;

    private localConfiguration: Configuration = new Configuration();
    private configurationChanged: boolean = false;
    private mqttClient = mqtt.connect('mqtt://192.168.31.125:9001');

    public created() {
      this.fetchRooms();

      this.mqttClient.on('connect', () => {
        console.log('CONNECTED');
      });
    }

    public get room() {
      return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);
    }

    public get device() {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
    }

    public get currentConfiguration(): any {
      if (this.localConfiguration.items.length === 0) {
        if (this.device === null) {
          return [];
        }
        this.localConfiguration.items = [];
        const savedConfiguration = this.device.configuration;
        for (const configurationItem of savedConfiguration.items) {
          this.localConfiguration.items.push(Object.assign({}, configurationItem));
        }
      }

      return this.localConfiguration;
    }

    public getConfigurationItemInput(configurationItem: ConfigurationItem) {
      switch (configurationItem.inputType) {
        case DeviceInputType.Color:
          return ColorInput.name;
        default:
          throw new Error(`Device with unknown input (${configurationItem.inputType})`);
      }
    }

    public onItemChange(color, item) {

      this.configurationChanged = true;
      const payload = [];

      for (let i = 0; i < this.currentConfiguration.items.length; i++) {
        // @ts-ignore
        const color = this.$refs['picker'+this.currentConfiguration.items[i].id].getValue();

        payload.push({
          r: parseInt(color[0]),
          g: parseInt(color[1]),
          b: parseInt(color[2]),
        })
      }

      this.mqttClient.publish('home/tv/light/solid', JSON.stringify(
          {
            '_': '_',
            'configs': payload,
          }
      ));


      // for (let i = 0; i < this.currentConfiguration.items.length; i++) {
      //   // @ts-ignore
      //   const color = this.$refs['picker'+this.currentConfiguration.items[i].id].setValue('#ffffff');
      // }

    }
  }
</script>

<style lang="scss" scoped>
    .device-icon {
        font-size: 50vw;
    }

    .configuration-card {
        height: 100%;
        overflow-y: hidden;
    }

</style>
