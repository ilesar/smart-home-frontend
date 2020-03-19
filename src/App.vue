<template>
  <div id="app">
<!--    <p>-->
<!--      <router-link to="/">Go to Foo</router-link>-->
<!--      <router-link to="/about">Go to Bar</router-link>-->
<!--    </p>-->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import HelloWorldDuoTone from '@/components/HelloWorldDuoTone.vue';
import HelloWorldWrapper from '@/components/HelloWorldWrapper.vue';

@Component({
  components: {
    HelloWorldWrapper,
    HelloWorldDuoTone,
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

    body {
        margin: 0;
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
