<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" @back="() => null" title="Title"
                   subTitle="This is a subtitle" class="o-section-header"/>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class DefaultHeader extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>
