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
                        <span @click="onPasteValue(configurationItem)" v-if="pasteable">
                            <a-icon type="copy"></a-icon>
                        paste
                        </span>
                    </a>
                    <a slot="actions">
                        <span @click="onCopyValue(configurationItem)">
                            <a-icon type="highlight"></a-icon>
                        copy
                        </span>
                    </a>
                    <a slot="actions">
                        <span @click="onCopyValueAll(configurationItem)">
                            <a-icon type="unordered-list"></a-icon>
                        copy to all
                        </span>
                    </a>
                    <a slot="actions">
                        <component :is="getConfigurationItemInput(configurationItem)"
                                   :ref="'picker'+configurationItem.id"
                                   @on-change="(value) => onItemChange(value, configurationItem, true)"></component>
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
  import {LocalStorageService} from '@/services/LocalStorageService';
  import {debounce} from 'vue-debounce';

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
    public pasteable = false;

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

    public onItemChange(color, item, send = false) {
      this.configurationChanged = true;

      if (send) {
        this.sendConfiguration();
      }
    }

    public onCopyValue(item) {
      this.pasteable = true;
      console.log(item);
      console.log(item.id);
      // @ts-ignore
      const value = this.$refs['picker' + item.id].getValue();
      console.log('COPY', value);
      LocalStorageService.save('deviceClipboard', value);
    }

    public onCopyValueAll(item) {
      this.onCopyValue(item);
      this.pasteable = false;
      const value = LocalStorageService.get('deviceClipboard');

      for (const item of this.currentConfiguration.items) {
        const listItem = this.$refs['picker' + item.id];
        // @ts-ignore
        listItem.setValue(value);
      }

      this.sendConfiguration();
    }

    public onPasteValue(item) {
      const value = LocalStorageService.get('deviceClipboard');

      const listItem = this.$refs['picker' + item.id];
      console.log('PASTE', value);

      // @ts-ignore
      listItem.setValue(value);
      this.configurationChanged = true;

      this.sendConfiguration();
    }

    private sendConfiguration() {
      const payload = [];

      for (let i = 0; i < this.currentConfiguration.items.length; i++) {
        // @ts-ignore
        const color = this.$refs['picker' + this.currentConfiguration.items[i].id].getValue();

        payload.push({
          r: parseInt(color[0]),
          g: parseInt(color[1]),
          b: parseInt(color[2]),
        });
      }

      this.mqttClient.publish('15ledstrip', JSON.stringify(
        {
          '_': '_',
          'configs': payload,
        }
      ));
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
