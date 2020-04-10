<template>
    <a-row type="flex" class="footer-wrapper" style="background: #1890ff">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                class="expense-statistic"
                suffix="KN"
                :value="recurringPaymentsSumMonthly"
                :valueStyle="{color: '#FFF'}"
                :style="{margin: '0 32px'}"
        >
            <div slot="title" style="color: #FFF">Mjesečni troškovi</div>
        </a-statistic>
        <a-statistic
                class="expense-statistic"
                suffix="KN"
                :valueStyle="{color: '#FFF'}"
                :value="(12 * parseFloat(recurringPaymentsSumMonthly) + parseFloat(recurringPaymentsSumYearly)).toFixed(2)"
                :style="{margin: '0 32px'}"
        >
            <div slot="title" style="color: #FFF">Ukupni godišnji trošak</div>
        </a-statistic>
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

<style lang="scss" scoped>
    .footer-wrapper {
        padding-bottom:24px;

        .ant-statistic-content {
            font-weight: 300;
        }

        .expense-statistic {
            .ant-statistic-title {
                color: #FFF;
            }

            .ant-statistic-content {
                //color: map-get(map-get($settings-colors, 'primary'), 'blue');
                font-weight: 500;
                color: #FFF;
            }
        }
    }
</style>
