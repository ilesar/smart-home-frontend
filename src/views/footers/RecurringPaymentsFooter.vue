<template>
    <a-row type="flex" class="footer-wrapper">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                title="Ukupni trošak"
                class="expense-statistic"
                suffix="KN"
                :value="recurringPaymentsSum"
                :style="{
            margin: '0 32px',
          }"
        />

    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component
  export default class RecurringPaymentsFooter extends Vue {
    @Getter('recurringpayments/getRecurringPaymentsSum')
    private recurringPaymentsSum;
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
                //color: map-get(map-get($settings-colors, 'primary'), 'blue');
                font-weight: 500;
            }
        }
    }
</style>
