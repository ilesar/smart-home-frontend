<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorldWrapper msg="Welcome to Your Vue.js App"/>
    <HelloWorldDuoTone msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import HelloWorldDuoTone from '@/components/HelloWorldDuoTone';
import HelloWorldWrapper from '@/components/HelloWorldWrapper';

export default {
  name: 'Home',
  components: {
    HelloWorldDuoTone,
    HelloWorldWrapper,
    HelloWorld,
  },
};
</script>
