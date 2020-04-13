<template>
    <div class="color-picker" style="height: 400px"></div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import Pickr from '@simonwep/pickr';

  @Component
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
        showAlways: false,
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
            clear: true,
            save: true
          }
        },
        strings: {
          save: 'Spremi',
          clear: 'Obriši',
          cancel: 'Odustani',
        }
      });

      this.picker.on('change', (color, instance) => {
        this.$emit('color-changed', color, instance)
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
