<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <HelloWorldWrapper msg="Welcome to Your Vue.js App"/>
        <HelloWorldDuoTone msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
  import HelloWorld from '@/components/home/HelloWorld.vue'
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone'
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper'

  export default {
    name: 'Devices',
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  }
</script>
