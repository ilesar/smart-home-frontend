<template>
    <span type="color" class="color-picker"></span>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import Pickr from '@simonwep/pickr';

  @Component({
    name: 'ColorInput'
  })
  export default class ColorInput extends Vue {
    private picker: Pickr;

    public mounted() {
      if (this.picker) {
        this.picker.destroy();
        this.picker = null;
      }

      this.picker = Pickr.create({
        el: '.color-picker',
        theme: 'classic',
        default: '#00FF00',
        padding: 0,
        showAlways: false,
        defaultRepresentation: 'RGBA',
        outputPrecision: 0,
        position: 'bottom-middle',
        appClass: 'custom-picker',
        components: {
          preview: true,
          opacity: false,
          hue: true,
          interaction: {
            hex: false,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: false,
            clear: false,
            save: true
          }
        },
        strings: {
          save: 'Spremi',
          clear: 'Obriši',
          cancel: 'Odustani',
        }
      });

      this.picker.on('save', (color, instance) => {
        this.$emit('on-change', color.toRGBA(), this);
        this.picker.hide();
        // debounce(() => this.$emit('on-change', color), 1000)();
      });

      // this.picker.on('change', (color, instance) => {
      //   debounce(() => this.$emit('on-change', color), 1000)();
      // });
    }

    public getValue() {
      return this.picker.getColor().toRGBA();
    }

    public setValue(color) {
      this.picker.setColor(color, true);
      this.picker.applyColor(true);
    }

    beforeDestroy() {
      this.picker.destroyAndRemove();
    }
  }
</script>

<style lang="scss" scoped>

</style>
