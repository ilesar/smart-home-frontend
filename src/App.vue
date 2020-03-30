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
        <Popup/>
    </div>
</template>

<script>
  import NavigationTemplate from '@/components/NavigationTemplate.vue';
  import Popup from '@/components/Popup.vue';


  export default {
    name: 'app',
    components: {Popup, NavigationTemplate},
  };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
    }
</style>
