<template>
    <div style="padding: 0px;" ref="configcard">
        <a-card :bordered="false" class="configuration-card"
                :body-style="{padding: '0', height: !$isMobile() ? 'calc(100vh - 129px)' : 'calc(100vh - 65px)', overflowY: 'scroll'}">
            <template slot="title" style="line-height: 32px">
                <a-affix :target="() => this.$refs.configcard">
                    Konfiguracija
                    <a-button type="primary"
                              style="float: right; margin-left: 16px"
                              v-if="activeTemplate && hasChanged"
                    >
                        Spremi
                    </a-button>
                    <a-button style="float: right"
                              v-if="activeTemplate && hasChanged"
                    >
                        Spremi kao novu
                    </a-button>
                </a-affix>

            </template>
            <a-list itemLayout="horizontal" :dataSource="activeTemplate ? activeTemplate.items : []">
                <a-empty
                        v-if="!activeTemplate"
                        :style="{ paddingTop: '64px'}"
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        :imageStyle="{height: '60px'}"
                >
                    <span slot="description">Ne postoji aktivna konfiguracija</span>
                </a-empty>
                <input-wrapper
                        slot="renderItem"
                        slot-scope="configurationItem"
                        :model="configurationItem"
                        @change="valueChanged"
                        @copy="copyValue"
                        @paste="pasteValue"
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
  import Device from '@/api/models/Device';
  import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';

  const mqtt = require('mqtt');

  @Component({
    name: 'DeviceConfigurationForm',
    components: {
      InputWrapper,
      ColorInputGroup,
      ColorInput,
    },
  })
  export default class DeviceConfigurationForm extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;
    // @Action('configurations/send') private sendConfiguration;

    private localConfiguration: Configuration = new Configuration();
    private hasChanged: boolean = false;

    public created() {
      this.fetchRooms();
    }

    public get device(): Device {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
    }

    public get activeTemplate(): ConfigurationTemplate {
      if (this.device) {
        return this.device.activeTemplate;
      }
      return null;
    }

    // public get currentConfiguration(): Configuration {
    //   if (this.localConfiguration.size > 0 || !this.device) {
    //     return this.localConfiguration;
    //   }
    //
    //   const savedConfiguration = this.device.configuration;
    //
    //   for (const configurationItem of savedConfiguration.items) {
    //     this.localConfiguration.items.push(Object.assign({}, configurationItem));
    //   }
    //
    //   return this.localConfiguration;
    // }

    private valueChanged() {
        this.sendConfiguration();
    }

    private copyValue() {
      for (let i = 0; i < this.activeTemplate.size; i++) {
        const colorInput = this.getConfigItem(i);
        colorInput.pasteable = true;
      }
    }

    private pasteValue() {
      this.hasChanged = true;
      this.sendConfiguration();
    }

    private pasteAllValues() {
      this.hasChanged = true;
      for (let i = 0; i < this.activeTemplate.size; i++) {
        const colorInput = this.getConfigItem(i);
        colorInput.pasteValue(true);
      }

      this.sendConfiguration();
    }

    private getConfigItem(index: number) {
      return this.$refs['configitem' + this.activeTemplate.items[index].id] as any;
    }


    private sendConfiguration() {
      const payload = [];

      for (let i = 0; i < this.activeTemplate.items.length; i++) {
        const colorInput = this.getConfigItem(i);

        const colorValue = colorInput.getValue();

        payload.push({
          r: parseInt(colorValue[0]),
          g: parseInt(colorValue[1]),
          b: parseInt(colorValue[2]),
        });
      }

      this.$mqtt.publish(this.device.deviceId, JSON.stringify(
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
