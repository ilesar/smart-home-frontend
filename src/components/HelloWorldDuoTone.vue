<template>
    <div class="hello">
        <h3>DUOTONE</h3>
        <br />
        <br />
        <input type="color" id="head" name="head" v-debounce:300ms="onChange"
               value="#e66465">
        <label for="head"> First Color</label>
        <input type="color" id="head2" name="head" v-debounce:300ms="onChange2"
               value="#e66465">
        <label for="head2"> Second Color</label>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  // @ts-ignore
  import mqtt = require('mqtt');
  const client = mqtt.connect('mqtt://192.168.31.125:9001');

  client.on('connect', () => {
    console.log('CONNECTED');
  });

  @Component
  export default class HelloWorldDuoTone extends Vue {
    @Prop() private msg!: string;


    private color = {
      value1: '#FFFFFF',
      value2: '#FFFFFF',
    };

    public onChange(newColor: string) {
      this.color.value1 = newColor;
      this.sendData();
    }

    public onChange2(newColor: string) {
      this.color.value2 = newColor;
      this.sendData();
    }

    private sendData() {
      const rgbColor = this.hexToRgb(this.color.value1);
      const rgbColor2 = this.hexToRgb(this.color.value2);

      if (rgbColor === null) {
        throw new Error('RGB CONVERSION FAILED');
      }

      if (rgbColor2 === null) {
        throw new Error('RGB CONVERSION FAILED');
      }

      client.publish('home/tv/light/duotone', JSON.stringify({
        start: {
          r: rgbColor.r.toString(),
          g: rgbColor.g.toString(),
          b: rgbColor.b.toString(),
        },
        end: {
          r: rgbColor2.r.toString(),
          g: rgbColor2.g.toString(),
          b: rgbColor2.b.toString(),
        },
      }));
    }

    private hexToRgb(hex: string) {
      console.log('CONVERTING: ', hex);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
