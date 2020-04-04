<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <HelloWorldWrapper msg="Welcome to Your Vue.js App"/>
        <HelloWorldDuoTone msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
  import { LoadingOverlayHelper } from '@/helpers/LoadingOverlayHelper';
  import {
    State,
    Getter,
    Action,
    Mutation,
    namespace,
  } from 'vuex-class';
  import {RouteNames} from '@/enums/RouteNames';
  import Room from '@/api/models/Room';

  @Component({
    name: 'Devices',
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  })
  export default class Devices extends Vue {
    @Getter('rooms/getAllRooms') private rooms;

    private loadingOverlay = new LoadingOverlayHelper(this, {});

    public beforeMount() {
        // this.fetchRooms();
    }

  }

</script>

<style lang="scss" scoped>
</style>
