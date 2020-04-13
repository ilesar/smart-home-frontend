<template>
    <div class="hello">
        <h3>WRAPPER</h3>
        <br/>
        <color-input @color-changed="onColorChangeOne"></color-input>
        <br/>
        <color-input @color-changed="onColorChangeTwo"></color-input>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';

  const mqtt = require('mqtt');
  const client = mqtt.connect('mqtt://192.168.31.125:9001');

  client.on('connect', () => {
    console.log('CONNECTED');
  });

  @Component({
    components: {
      ColorInput,
    }
  })
  export default class HelloWorldWrapper extends Vue {


    private color = {
      value1: undefined,
      value2: undefined,
    };

    public onColorChangeOne(color, instance) {
      this.color.value1 = color.toRGBA();
      this.sendData();
    }

    public onColorChangeTwo(color, instance) {
      this.color.value2 = color.toRGBA();
      this.sendData();
    }

    private sendData() {
      client.publish('home/tv/light/wrapper', JSON.stringify({
        inner: {
          r: this.color.value1 ? parseInt(this.color.value1[0]).toString() : parseInt(this.color.value2[0]).toString(),
          g: this.color.value1 ? parseInt(this.color.value1[1]).toString() : parseInt(this.color.value2[1]).toString(),
          b: this.color.value1 ? parseInt(this.color.value1[2]).toString() : parseInt(this.color.value2[2]).toString(),
        },
        outer: {
          r: this.color.value2 ? parseInt(this.color.value2[0]).toString() : parseInt(this.color.value1[0]).toString(),
          g: this.color.value2 ? parseInt(this.color.value2[1]).toString() : parseInt(this.color.value1[1]).toString(),
          b: this.color.value2 ? parseInt(this.color.value2[2]).toString() : parseInt(this.color.value1[2]).toString(),
        },
      }));
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
