<template>
    <a-layout class="o-section">
<!--        <a-layout-header class="o-section__header">-->
<!--            <a-menu-->
<!--                    class="o-section__horizontal-navigation"-->
<!--                    theme="light"-->
<!--                    mode="horizontal"-->
<!--                    :defaultSelectedKeys="['2']"-->
<!--            >-->
<!--                <AMenuItem class="o-section__user-settings-icon" @click="goToUserSettings">-->
<!--                    <AIcon type="setting"></AIcon>-->
<!--                </AMenuItem>-->
<!--            </a-menu>-->
<!--        </a-layout-header>-->
        <a-layout>
            <a-layout-sider class="o-section__sidemenu-wrapper">
                <a-menu
                        :defaultSelectedKeys="defaultSelectedKeys"
                        mode="inline"
                        class="o-section__sidemenu"
                >
                    <a-menu-item
                            key="devices"
                            @click="goToDevices()"
                    >
                        <a-icon type="bulb"/>
                        Uređaji
                    </a-menu-item>

                    <a-menu-item
                            key="shopping"
                            @click="goToShopping()"
                    >
                        <a-icon type="shopping"/>
                        Šoping
                    </a-menu-item>

                    <a-menu-item
                            key="payments"
                            @click="goToPayments()"
                    >
                        <a-icon type="idcard"/>
                        Plaćanja
                    </a-menu-item>
                    <a-menu-item
                            key="groceries"
                            @click="goToGroceries()"
                    >
                        <a-icon type="cloud"/>
                        Namirnice
                    </a-menu-item>
                    <a-menu-item
                            key="logout"
                            @click="logout()"
                    >
                        <a-icon type="logout"/>
                        Odjavi se
                    </a-menu-item>

                </a-menu>
            </a-layout-sider>
            <a-layout class="o-section__main-section">
                <a-layout-content
                        class="o-section__content"
                >
                    <slot></slot>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import User from '@/api/models/User.ts';
  import {RouteNames} from '@/enums/RouteNames';
  import {CmsEntityTypes} from '@/enums/CmsEntityTypes';

  @Component({
    name: 'NavigationTemplate',
  })
  export default class NavigationTemplate extends Vue {
    private defaultSelectedKeys: string[] = [];

    private logout() {
      User.logout().then(() => {
        this.$router.push({name: RouteNames.Login});
      });
    }

    private goToDevices() {
      if (this.$route.name !== RouteNames.Devices) {
        this.$router.push({name: RouteNames.Devices});
      }
    }

    private goToShopping() {
      if (this.$route.name !== RouteNames.Shopping) {
        this.$router.push({name: RouteNames.Shopping});
      }
    }

    private goToPayments() {
      if (this.$route.name !== RouteNames.Payments) {
        this.$router.push({name: RouteNames.Payments});
      }
    }

    private goToGroceries() {
      if (this.$route.name !== RouteNames.Groceries) {
        this.$router.push({name: RouteNames.Groceries});
      }
    }

    //
    // private goToProductDetails(product: Product) {
    //     this.$router.push({
    //         name: RouteNames.cmsIndex,
    //         params: {
    //             entityName: CmsEntityTypes.ProductDetails,
    //             entityId: product.productDetails ? product.productDetails.id : 'new',
    //         },
    //         query: {
    //             additionalId: product.id,
    //         },
    //     });
    // }

    private async created() {
      switch (this.$route.name) {
        case RouteNames.Devices:
          this.defaultSelectedKeys.push('devices');
          break;
        case RouteNames.Shopping:
          this.defaultSelectedKeys.push('shopping');
          break;
        case RouteNames.Payments:
          this.defaultSelectedKeys.push('payments');
          break;
        default:
          break;
      }
    }

  }
</script>

<style scoped lang="scss">
    .o-section {
        height: 100vh;

        /*
        &__header {
            background: $white-two !important;

        }

        &__logo {
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $mid-blue;
            text-transform: uppercase;
            padding: 10px;
            margin: 0 47px 0 0;
            max-width: 120px;

        }

        &__horizontal-navigation {
            line-height: 64px !important;
        }

        &__sidemenu-wrapper {
            background-color: $white-two;
            overflow-y: auto;
            height: calc(100vh - 70px);
        }

        &__sidemenu {
            border-right: none;
            height: 100%;
        }

        &__main-section {
            background: $white-two !important;
        }

        &__breadcrumbs {
            margin: 16px 0 !important;
        }

        &__content {
            min-height: 280px;
        }

        &__user-settings-icon {
            float: right;

            .anticon {
                margin-right: 0;
            }
        }

        .ant-menu-horizontal > .ant-menu-item {
            vertical-align: middle;

            .ant-input-group-wrapper {
                display: block;
            }

            &:hover, &.ant-menu-item-selected {
                border-bottom: none;
            }
        }

        &__logout {
            max-width: 120px;
            display: block;
            margin: 0 auto;
        }

        .first-divider {
            margin-top: 1px;
        }*/
    }

</style>
