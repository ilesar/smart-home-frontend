<template>
    <p>Konfiguracija</p>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action} from 'vuex-class';
  import {RouteNames} from '@/enums/RouteNames';

  @Component({
    name: 'DeviceConfiguration',
    components: {

    },
  })
  export default class DeviceConfiguration extends Vue {
    @Action('rooms/fetchRooms') private fetchRooms;

  }

</script>

<style lang="scss" scoped>


</style>
