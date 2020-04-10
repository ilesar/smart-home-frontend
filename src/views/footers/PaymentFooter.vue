<template>
    <a-row type="flex" class="footer-wrapper" style="background: #1890ff">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                class="expense-statistic"
                suffix="KN"
                :valueStyle="{color: '#FFF'}"
                :value="unresolvedExpensesSum"
                :style="{margin: '0 32px'}"
        >
            <div slot="title" style="color: #FFF">Preostalo za platiti</div>
        </a-statistic>
        <a-statistic
                class="expense-statistic"
                :valueStyle="{color: '#FFF'}"
                :value="unresolvedExpensesCount"
                :style="{margin: '0 32px'}"
        >
            <div slot="title" style="color: #FFF">Broj stavki</div>
        </a-statistic>

    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component
  export default class PaymentFooter extends Vue {
    @Getter('expenses/getUnresolvedExpensesSum')
    private unresolvedExpensesSum;

    @Getter('expenses/getUnresolvedExpensesCount')
    private unresolvedExpensesCount;
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
