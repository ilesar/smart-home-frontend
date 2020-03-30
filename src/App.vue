<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorldWrapper msg="Welcome to Your Vue.js App"/>
    <HelloWorldDuoTone msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HelloWorldWrapper from '@/components/HelloWorldWrapper';
import HelloWorldDuoTone from '@/components/HelloWorldDuoTone';

export default {
  name: 'app',
  components: {
    HelloWorldDuoTone,
    HelloWorldWrapper,
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
