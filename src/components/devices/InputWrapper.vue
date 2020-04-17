<template>
    <a-list-item style="padding: 16px 24px">
        <a-list-item-meta :title="configModel.name"
                          :description="!$isMobile() ? configModel.description : ''"></a-list-item-meta>
        <a slot="actions">
                        <span @click="pasteValue(false)" v-if="pasteable && $mqtt.connected">
                            <a-icon type="copy"></a-icon>
                        paste
                        </span>
        </a>
        <a slot="actions">
                        <span @click="copyValue" v-if="$mqtt.connected">
                            <a-icon type="highlight"></a-icon>
                        copy
                        </span>
        </a>
        <a slot="actions">
                        <span @click="copyAllValues" v-if="$mqtt.connected">
                            <a-icon type="unordered-list"></a-icon>
                        copy to all
                        </span>
        </a>
        <a slot="actions">
            <component :is="configurationItemType"
                       ref="viewModel"
                       @on-change="valueChanged"></component>
        </a>

    </a-list-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch, Emit, Ref} from 'vue-property-decorator';
  import {LocalStorageService} from '@/services/LocalStorageService';
  import ConfigurationItem from '@/api/models/ConfigurationItem';
  import {DeviceInputType} from '@/enums/DeviceInputType';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';
  import {ConfigurationInputInterface} from '@/interfaces/ConfigurationInputInterface';
  import ConfigurationTemplateItem from '@/api/models/ConfigurationTemplateItem';

  @Component({
    name: 'InputWrapper',
    components: {
      ColorInput,
    },
  })
  export default class InputWrapper extends Vue {
    @Prop()
    private model!: ConfigurationTemplateItem;
    public pasteable = false;

    @Ref(`viewModel`)
    public readonly viewModel!: ConfigurationInputInterface<any>

    public get configModel(): ConfigurationItem {
      return this.model.configurationItem;
    }

    @Emit('change')
    public valueChanged() {}

    @Emit('copy')
    public copyValue() {
      const value = this.viewModel.getValue();
      LocalStorageService.save('deviceClipboard', value);
    }

    @Emit('copy-all')
    public copyAllValues() {
      const value = this.viewModel.getValue();
      LocalStorageService.save('deviceClipboard', value);
    }

    public pasteValue(silent: boolean = false) {
      const value = LocalStorageService.get('deviceClipboard');
      this.viewModel.setValue(value);

      if (silent == false) {
        this.$emit('paste');
      }
    }

    public getValue() {
      return this.viewModel.getValue();
    }

    public get configurationItemType() {
      switch (this.configModel.inputType) {
        case DeviceInputType.Color:
          return ColorInput.name;
        default:
          throw new Error(`Device with unknown input (${this.model.configurationItem.inputType})`);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
