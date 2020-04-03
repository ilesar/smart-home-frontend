<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Povijest kupovine" @back="goBackToShopping" class="o-section-header">
        <template slot="extra">
            <a-button type="danger" >
                Očisti povijest
            </a-button>
        </template>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class ShoppingHeader extends Vue {

    public goBackToShopping() {
      this.$router.push({name: RouteNames.Shopping});
    }

  }
</script>

<style lang="scss">
    .add-button {
        margin-left: 16px;
    }
</style>
