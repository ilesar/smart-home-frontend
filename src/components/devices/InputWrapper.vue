<template>
    <a-list-item style="padding: 16px 24px">
        <a-list-item-meta :title="model.name"
                          :description="!$isMobile() ? model.description : ''"></a-list-item-meta>
        <a slot="actions">
                        <span @click="pasteValue(false)" v-if="pasteable">
                            <a-icon type="copy"></a-icon>
                        paste
                        </span>
        </a>
        <a slot="actions">
                        <span @click="copyValue">
                            <a-icon type="highlight"></a-icon>
                        copy
                        </span>
        </a>
        <a slot="actions">
                        <span @click="copyAllValues">
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

  @Component({
    name: 'InputWrapper',
    components: {
      ColorInput,
    },
  })
  export default class InputWrapper extends Vue {
    @Prop()
    private model!: ConfigurationItem;
    public pasteable = false;

    @Ref(`viewModel`)
    public readonly viewModel!: ConfigurationInputInterface<any>;

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
      switch (this.model.inputType) {
        case DeviceInputType.Color:
          return ColorInput.name;
        default:
          throw new Error(`Device with unknown input (${this.model.inputType})`);
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
