<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Povijest plaćanja" @back="goBackToPayments" class="o-section-header">
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class HistoryHeader extends Vue {

    public goBackToPayments() {
      this.$router.push({name: RouteNames.Payments});
    }

  }
</script>

<style lang="scss" scoped>
    .add-button {
        margin-left: 16px;
    }
</style>
