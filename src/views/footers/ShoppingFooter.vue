<template>
    <a-row type="flex" class="footer-wrapper">
        <a-divider style="margin-top: 0px"></a-divider>
        <a-statistic
                title="Ukupni trošak"
                class="expense-statistic"
                suffix="KN"
                :value="shoppingListItemSum"
                :style="{
            margin: '0 32px',
          }"
        />
<!--        <a-statistic-->
<!--                title="Broj proizvoda"-->
<!--                :value="shoppingListItemCount"-->
<!--                :style="{-->
<!--            margin: '0 32px',-->
<!--          }"-->
<!--        />-->
<!--        <a-statistic-->
<!--                title="Starost košarice"-->
<!--                :value="shoppingListAge"-->
<!--                :style="{-->
<!--            margin: '0 32px',-->
<!--          }"-->
<!--        />-->

    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component
  export default class ShoppingFooter extends Vue {
    @Getter('shopping/getShoppingListSum')
    private shoppingListItemSum;
    @Getter('shopping/getShoppingListItemCount')
    private shoppingListItemCount;
    @Getter('shopping/getShoppingListAge')
    private shoppingListAge;
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
