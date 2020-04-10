<template>
    <a-row type="flex" class="footer-wrapper" v-if="shoppingListItemSum > 0" style="background: #1890ff">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                class="expense-statistic"
                suffix="KN"
                :value="shoppingListItemSum"
                :valueStyle="{color: '#FFF'}"
                :style="{margin: '0 32px'}"
        >
            <div slot="title" style="color: #FFF">Ukupni trošak</div>
        </a-statistic>

    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component
  export default class ShoppingFooter extends Vue {
    @Getter('shopping/getShoppingListSum')
    private shoppingListItemSum;
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
