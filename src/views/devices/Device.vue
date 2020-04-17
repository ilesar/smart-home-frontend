<template>
    <div style="padding: 0px;" ref="configcard">
        <a-card :bordered="false" class="configuration-card"
                :body-style="{padding: '0', height: !$isMobile() ? 'calc(100vh - 129px)' : 'calc(100vh - 65px)', overflowY: 'scroll'}">
            <template slot="title" style="line-height: 32px">
                <a-affix :target="() => this.$refs.configcard">
                    Konfiguracija
                    <a-button type="primary"
                              style="float: right; margin-left: 16px">Spremi
                    </a-button>
                    <a-button style="float: right">Spremi kao novu</a-button>
                </a-affix>

            </template>
            <a-list itemLayout="horizontal" :dataSource="currentConfiguration.items">
                <input-wrapper
                        slot="renderItem"
                        slot-scope="configurationItem"
                        :model="configurationItem"
                        @send="sendConfiguration"
                        @copy="copyValue"
                        @copy-all="pasteAllValues"
                        :ref="'configitem'+configurationItem.id"
                ></input-wrapper>
            </a-list>
        </a-card>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';
  import ColorInputGroup from '@/components/devices/inputs/ColorInputGroup.vue';
  import Configuration from '@/api/models/Configuration';
  import InputWrapper from '@/components/devices/InputWrapper.vue';

  const mqtt = require('mqtt');

  @Component({
    name: 'Device.vue',
    components: {
      InputWrapper,
      ColorInputGroup,
      ColorInput,
    },
  })
  export default class DeviceConfiguration extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;

    private localConfiguration: Configuration = new Configuration();

    public created() {
      this.fetchRooms();
    }

    public get device() {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
    }

    public get currentConfiguration(): Configuration {
      if (this.localConfiguration.items.length > 0 || !this.device) {
        return this.localConfiguration;
      }

      const savedConfiguration = this.device.configuration;

      for (const configurationItem of savedConfiguration.items) {
        this.localConfiguration.items.push(Object.assign({}, configurationItem));
      }

      return this.localConfiguration;
    }

    private sendConfiguration() {
      const payload = [];

      console.log(this.currentConfiguration);
      for (let i = 0; i < this.currentConfiguration.items.length; i++) {
        const colorInput = this.$refs['configitem' + this.currentConfiguration.items[i].id] as any;
        const colorValue = colorInput.getValue();

        payload.push({
          r: parseInt(colorValue[0]),
          g: parseInt(colorValue[1]),
          b: parseInt(colorValue[2]),
        });
      }

      this.$mqtt.publish('15ledstrip', JSON.stringify(
        {
          '_': '_',
          'configs': payload,
        }
      ));
    }

    private pasteAllValues() {

      console.log(this.currentConfiguration);
      for (let i = 0; i < this.currentConfiguration.items.length; i++) {
        const colorInput = this.$refs['configitem' + this.currentConfiguration.items[i].id] as any;
        colorInput.pasteValue(false);
      }

      this.sendConfiguration();
    }

    private copyValue() {
      for (let i = 0; i < this.currentConfiguration.items.length; i++) {
        const colorInput = this.$refs['configitem' + this.currentConfiguration.items[i].id] as any;
        colorInput.pasteable = true;
      }
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
