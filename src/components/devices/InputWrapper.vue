<template>
    <a-list-item style="padding: 16px 24px">
        <a-list-item-meta :title="model.name"
                          :description="!$isMobile() ? model.description : ''"></a-list-item-meta>
        <a slot="actions">
                        <span @click="pasteValue" v-if="pasteable">
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
                       :ref="'viewModel' + model.id"
                       @on-change="sendConfiguration()"></component>
        </a>

    </a-list-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
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

    public get viewModel(): ConfigurationInputInterface<any> {
      // @ts-ignore
      return this.$refs['viewModel'+this.model.id];
    }

    public getValue() {
      return this.viewModel.getValue();
    }

    @Emit('copy')
    public copyValue() {
      const value = this.viewModel.getValue();
      LocalStorageService.save('deviceClipboard', value);
    }

    @Emit('send')
    public sendConfiguration() {}

    @Emit('copy-all')
    public copyAllValues() {
      this.copyValue();
    }

    @Emit('paste')
    public pasteValue(send: boolean = true) {
      const value = LocalStorageService.get('deviceClipboard');
      this.viewModel.setValue(value);

      if (send) {
        this.sendConfiguration();
      }
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
