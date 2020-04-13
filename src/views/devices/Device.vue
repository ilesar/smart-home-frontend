<template>
    <div style="padding: 24px;">
<!--        <a-card title="Kontrole">-->
<!--            <a-list itemLayout="horizontal" :dataSource="[]">-->
<!--                <a-list-item slot="renderItem" slot-scope="configurationItem">-->
<!--                    <a-list-item-meta :title="configurationItem.name" :description="configurationItem.description"></a-list-item-meta>-->
<!--                    <component :is="getConfigurationItemInput(configurationItem)"></component>-->
<!--                </a-list-item>-->
<!--            </a-list>-->
<!--        </a-card>-->
        <a-card title="Trenutna konfiguracija">
            <a-list itemLayout="horizontal" :dataSource="currentConfiguration.items">
                <a-list-item slot="renderItem" slot-scope="configurationItem">
                    <a-list-item-meta :title="configurationItem.name" :description="configurationItem.description"></a-list-item-meta>
                    <component :is="getConfigurationItemInput(configurationItem)"></component>
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

    public created() {
      this.fetchRooms();
    }

    public get room() {
      return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);
    }

    public get device() {
      return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
    }

    public get currentConfiguration() {
        if (this.localConfiguration.items.length === 0) {
          if (this.device === null) {
            return [];
          }
          this.localConfiguration.items = [];
          const savedConfiguration = this.device.configuration;
          for(const configurationItem of  savedConfiguration.items) {
            this.localConfiguration.items.push(Object.assign({}, configurationItem));
          }
        }

        return this.localConfiguration;
    }

    public getConfigurationItemInput(configurationItem: ConfigurationItem) {
      console.log('CALLED');
      switch (configurationItem.inputType) {
        case DeviceInputType.Color:
          return ColorInput.name;
        default:
          throw new Error(`Device with unknown input (${configurationItem.inputType})`);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .device-icon {
        font-size: 50vw;
    }

</style>
