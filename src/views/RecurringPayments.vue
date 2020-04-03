<template>
    <span>
        <a-descriptions bordered v-for="payment in payments" :key="payment.id" style="margin-bottom: 24px">
            <a-descriptions-item label="Naziv" :span="3"><b>Leasing za auto</b></a-descriptions-item>
             <a-descriptions-item label="Iznos">$80.00</a-descriptions-item>
            <a-descriptions-item label="Stvoreno">2018-04-24 18:00:00</a-descriptions-item>
            <a-descriptions-item label="Zadnje plaćanje" :span="2">
                2019-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="Status" :span="3">
                <a-badge status="success" text="Active"/>
            </a-descriptions-item>

        </a-descriptions>
    </span>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: 'RecurringPayments',
    components: {},
  })
  export default class RecurringPayments extends Vue {
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

<style lang="scss" scoped>

</style>
