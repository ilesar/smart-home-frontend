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
        <Popup v-if="$route.meta.popup" />
        <CrudModelDrawer />
    </div>
</template>

<script lang="ts">
import NavigationTemplate from '@/components/NavigationTemplate.vue';
import Popup from '@/components/Popup.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LoadingOverlayHelper } from '@/helpers/LoadingOverlayHelper';
import CrudModelDrawer from '@/components/CrudModelDrawer.vue';
import {EventBus} from '@/helpers/EventBusHelper';
import {EventBusEvents} from '@/enums/EventBusEvents';

@Component({
  name: 'App',
  components: {
    CrudModelDrawer,
    Popup,
    NavigationTemplate,
  },
})
export default class App extends Vue {
  @Action('shoppingModule/getItems') private actionFoo;

}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        height: 100%;
    }

    @media only screen and (max-width: 576px) {
        #app {
            zoom: 0.8;
        }
    }
</style>
