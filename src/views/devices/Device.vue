<template>
    <div style="padding: 0px;" ref="configcard">
        <a-card :bordered="false" class="configuration-card"
                :body-style="{padding: '0', height: !$isMobile() ? 'calc(100vh - 129px)' : 'calc(100vh - 65px)', overflowY: 'scroll'}">
            <template slot="title" style="line-height: 32px">
                <a-affix :target="() => this.$refs.configcard">
                    Predlošci
                    <!--                    <a-button type="default"-->
                    <!--                              style="float: right; margin-right: 8px"-->
                    <!--                    >-->
                    <!--                        Stvori novi predložak-->
                    <!--                    </a-button>-->
                </a-affix>

            </template>
            <a-list itemLayout="horizontal" :dataSource="templates">
                <a-empty
                        v-if="templates.length === 0"
                        :style="{ paddingTop: '64px'}"
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        :imageStyle="{height: '60px'}"
                >
                </a-empty>
                <a-list-item style="padding: 16px 24px" slot="renderItem" slot-scope="template">
                    <a-list-item-meta>
                        <a slot="title">
                            {{ template.name }}
                        </a>
                        <a slot="description">
                            <a-col style="width: 20vw; min-width: 200px">
                                <a-progress
                                        :strokeColor="lampColorSchema(template)"
                                        :percent="100"
                                        type="line"
                                        :strokeWidth="10"
                                        :show-info="false"
                                />
                            </a-col>
                        </a>
                    </a-list-item-meta>

                    <a slot="actions">
                        <a-badge
                                :count="'Aktivna konfiguracija'"
                                v-if="template.isActive === true && !activating"
                                :numberStyle="{
                                    backgroundColor: '#fff',
                                    color: '#999',
                                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                                  }"
                                style="margin-right: 50%"
                        >

                        </a-badge>
                        <a-button type="primary"
                                  style="float: right; margin-right: 0px"
                                  v-if="template.isActive === false && !activating"
                                  @click="activateTemplate(template)"
                        >
                            Aktiviraj
                        </a-button>
                    </a>

                </a-list-item>
            </a-list>
        </a-card>
    </div>
</template>s

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';
  import ColorInputGroup from '@/components/devices/inputs/ColorInputGroup.vue';
  import InputWrapper from '@/components/devices/InputWrapper.vue';
  import Device from '@/api/models/Device';
  import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';

  const mqtt = require('mqtt');

  @Component({
    name: 'Device',
    components: {
      InputWrapper,
      ColorInputGroup,
      ColorInput,
    },
  })
  export default class DeviceConfiguration extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;
    @Action('configurationtemplates/updateConfigurationTemplate')
    private updateConfigurationTemplate;

    private activating = false;

    public created() {
      this.fetchRooms();
    }

    public get device(): Device {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
    }

    public get templates(): ConfigurationTemplate[] {
      if (this.device) {
        return this.device.configuration.templates;
      }

      return [];
    }

    public lampColorSchema(template: ConfigurationTemplate) {
      const schema = {};
      let i = 0;

      for (const configurationItem of template.items) {
        const percent = Math.round(i * (100 / (template.items.length - 1))) + '%';
        schema[percent] = configurationItem.value;
        i++;
      }

      return schema;
    }


    public activateTemplate(template: ConfigurationTemplate) {
      template.isActive = true;
      this.updateConfigurationTemplate(template).then(() => {
        this.fetchRooms();
      });
    }

    hexToRGB(hex){
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
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
