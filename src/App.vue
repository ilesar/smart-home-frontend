<template>
  <div id="app">
    <template v-if="$route.meta.navigationLayout">
      <navigation-template>
        <router-view></router-view>
      </navigation-template>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
<!--    <Popup />-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HelloWorldWrapper from '@/components/HelloWorldWrapper';
import HelloWorldDuoTone from '@/components/HelloWorldDuoTone';

export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
