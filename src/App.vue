<template>
    <div id="app">
        <template v-if="$route.meta.navigationLayout">
            <navigation-template>
                <transition>
                    <router-view></router-view>
                </transition>
            </navigation-template>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
        <Popup v-if="$route.meta.popup" />
    </div>
</template>

<script lang="ts">
import NavigationTemplate from '@/components/NavigationTemplate.vue';
import Popup from '@/components/Popup.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LoadingOverlayHelper } from '@/helpers/LoadingOverlayHelper';
import GroceryItem from '@/api/models/GroceryItem';
import GroceryController from '@/api/controllers/GroceryController';

@Component({
  name: 'App',
  components: {
    Popup,
    NavigationTemplate,
  },
})
export default class App extends Vue {
  @Action('shoppingModule/getItems') private actionFoo;

  private loadingOverlay = new LoadingOverlayHelper(this, {});

}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        height: 100vh;
    }
</style>
