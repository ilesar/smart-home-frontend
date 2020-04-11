<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Plaćanja" class="o-section-header">
        <template slot="extra">
            <router-link :to="{name: historyRoute }">
                <a-button type="default" @click="">Povijest plaćanja</a-button>
            </router-link>
        </template>
    </a-page-header>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {RouteNames} from '@/enums/RouteNames';

  @Component
  export default class PaymentHeader extends Vue {
    private readonly historyRoute = RouteNames.PaymentHistory;
  }
</script>

<style lang="scss" scoped>
</style>
