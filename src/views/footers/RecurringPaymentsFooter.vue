<template>
    <a-row type="flex" class="footer-wrapper">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                title="Mjesečni troškovi"
                class="expense-statistic"
                suffix="KN"
                :value="recurringPaymentsSumMonthly"
                :style="{
            margin: '0 32px',
          }"
        />
<!--        <a-statistic-->
<!--                title="Godišnji troškovi"-->
<!--                class="expense-statistic"-->
<!--                suffix="KN"-->
<!--                :value="recurringPaymentsSumYearly"-->
<!--                :style="{-->
<!--            margin: '0 32px',-->
<!--          }"-->
<!--        />-->
        <a-statistic
                title="Ukupni godišnji trošak"
                class="expense-statistic"
                suffix="KN"
                :value="(12 * parseFloat(recurringPaymentsSumMonthly) + parseFloat(recurringPaymentsSumYearly)).toFixed(2)"
                :style="{
            margin: '0 32px',
          }"
        />
<!--        <a-statistic-->
<!--                title="Prosječni mjesečni trošak"-->
<!--                class="expense-statistic"-->
<!--                suffix="KN"-->
<!--                :value="(parseFloat(recurringPaymentsSumMonthly) + parseFloat(recurringPaymentsSumYearly) / 12).toFixed(2)"-->
<!--                :style="{-->
<!--            margin: '0 32px',-->
<!--          }"-->
        />

    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component
  export default class RecurringPaymentsFooter extends Vue {
    @Getter('recurringpayments/getAllRecurringPaymentsSum')
    private recurringPaymentsSumAll;
    @Getter('recurringpayments/getMonthlyRecurringPaymentsSum')
    private recurringPaymentsSumMonthly;
    @Getter('recurringpayments/getYearlyRecurringPaymentsSum')
    private recurringPaymentsSumYearly;

  }
</script>

<style lang="scss">
    .footer-wrapper {
        padding-bottom:24px;

        .ant-statistic-content {
            font-weight: 300;
        }

        .expense-statistic {
            .ant-statistic-title {

            }

            .ant-statistic-content {
                font-weight: 500;

            }
        }
    }
</style>
