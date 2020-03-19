<template>
  <div class="home">
    <router-link to="/about">Go to Bar</router-link>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <HelloWorldDuoTone msg="Welcome to Your Vue.js + TypeScript App"/>
    <HelloWorldWrapper msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorldDuoTone from '@/components/HelloWorldDuoTone'
import HelloWorldWrapper from '@/components/HelloWorldWrapper'

export default {
  name: 'Home',
  components: {
    HelloWorldWrapper,
    HelloWorldDuoTone,
    HelloWorld
  }
}
</script>
