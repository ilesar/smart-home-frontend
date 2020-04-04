<template>
    <div style="padding-right: 24px">
        <a-descriptions bordered v-for="payment in payments" :key="payment.id" style="margin-bottom: 24px">
            <a-descriptions-item label="Naziv" :span="2"><b>Leasing za auto</b></a-descriptions-item>
            <a-descriptions-item label="Iznos" :span="2">80.00 kn</a-descriptions-item>
            <a-descriptions-item label="Status" :span="2">
                <a-badge status="success" text="Active"/>
            </a-descriptions-item>
            <a-descriptions-item label="Zadnje plaćanje" :span="2">
                2019-04-24 18:00:00
            </a-descriptions-item>


        </a-descriptions>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Payment extends Vue {
    private payments = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ];
  }
</script>

<style lang="scss">

</style>
