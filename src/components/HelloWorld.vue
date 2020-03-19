<template>
    <div class="hello">
        <h3>SOLID</h3>
        <br />
        <br />
        <input type="color" id="head" name="head" v-model="color" v-debounce:300ms="onChange"
               value="#e66465">
        <label for="head"> Light Color</label>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  const mqtt = require('mqtt');
  const client = mqtt.connect('mqtt://192.168.31.125:9001');

  client.on('connect', function() {
    console.log('CONNECTED');
  });

  @Component
  export default class HelloWorld extends Vue {
    @Prop() private msg!: string;


    private color = {
      value: '#FFFFFF',
    };

    public onChange(newColor: string) {
      console.log('this');

      const rgbColor = this.hexToRgb(newColor);

      if (rgbColor === null) {
        throw new Error("RGB CONVERSION FAILED");
        return;
      }

      console.log(rgbColor.r.toString());
      console.log(rgbColor.g.toString());
      console.log(rgbColor.b.toString());

      client.publish('home/tv/light/solid', JSON.stringify({
        'r': rgbColor.r.toString(),
        'g': rgbColor.g.toString(),
        'b': rgbColor.b.toString(),
      }));
    }

    hexToRgb(hex: string) {
      console.log('CONVERTING: ', hex)
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
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
