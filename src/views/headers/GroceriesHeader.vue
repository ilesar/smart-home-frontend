<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Namirnice" class="o-section-header">
        <template slot="extra">
            <a-button type="primary" @click="() => {}" >
                Nova namirnica
            </a-button>
        </template>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class GroceriesHeader extends Vue {

  }
</script>

<style lang="scss">

</style>
