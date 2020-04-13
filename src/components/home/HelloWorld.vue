<template>
    <div class="hello">
        <h3>SOLID</h3>
        <br/>
        <color-input @color-changed="onColorChange"></color-input>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Pickr from '@simonwep/pickr';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';

  const mqtt = require('mqtt');
  const client = mqtt.connect('mqtt://192.168.31.125:9001');

  client.on('connect', () => {
    console.log('CONNECTED');
  });
  @Component({
    components: {ColorInput}
  })
  export default class HelloWorld extends Vue {

    public onColorChange(color, instance) {
      client.publish('home/tv/light/solid', JSON.stringify({
        r: parseInt(color[0]).toString(),
        g: parseInt(color[1]).toString(),
        b: parseInt(color[2]).toString(),
      }));
    }

  }
</script>

<style scoped lang="scss">

</style>
