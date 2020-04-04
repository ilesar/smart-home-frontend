<template>
    <a-layout id="components-layout-demo-custom-trigger" class="o-section">
        <a-layout>
            <a-layout-sider theme="light" :trigger="null" collapsible v-model="collapsed" class="o-section-slider">
                <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']" class="o-section-nav">
                    <a-menu-item
                            key="devices"
                            @click="goToDevices()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="bulb"/>
                        <span>Uređaji</span>
                    </a-menu-item>

                    <a-menu-item
                            key="shopping"
                            @click="goToShopping()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="shopping"/>
                        <span>Šoping</span>
                    </a-menu-item>

                    <a-menu-item
                            key="payments"
                            @click="goToPayments()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="idcard"/>
                        <span>Plaćanja</span>
                    </a-menu-item>
                    <a-divider></a-divider>
                    <a-menu-item
                            key="groceries"
                            @click="goToGroceries()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="cloud"/>
                        <span>Namirnice</span>
                    </a-menu-item>
                    <a-menu-item
                            key="recurringPayments"
                            @click="goToRecurringItems()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="reload"/>
                        <span>Ponavljajuća plaćanja</span>
                    </a-menu-item>
                    <a-divider></a-divider>
                    <a-menu-item
                            key="logout"
                            @click="logout()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="logout"/>
                        <span>Odjavi se</span>
                    </a-menu-item>
                    <a-menu-item
                            key="menuControl"
                            style="position:absolute; bottom: 0px;"
                            @click="()=> collapsed = !collapsed"
                    >
                        <a-icon
                                class="trigger"
                                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        />
                        <span>Collapse</span>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <vue-page-transition name="fade-in-right">
                <a-layout-header style="background: #fff; padding: 0">
                    <router-view name="header"></router-view>

                </a-layout-header>
                </vue-page-transition>
                <a-layout-content
                        class="content-container"
                >
                    <slot></slot>
                </a-layout-content>
                <a-layout-footer style="background: #fff; padding: 0">
                    <router-view name="footer"></router-view>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {RouteNames} from '@/enums/RouteNames';
  import AuthController from '@/api/controllers/AuthController';

  @Component({
    name: 'NavigationTemplate',
  })
  export default class NavigationTemplate extends Vue {
    private defaultSelectedKeys: string[] = [];

    private collapsed: boolean = false;

    private logout() {
      AuthController.logout().then(() => {
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

    private goToRecurringItems() {
      if (this.$route.name !== RouteNames.RecurringPayments) {
        this.$router.push({name: RouteNames.RecurringPayments});
      }
    }

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

        &-nav {
            /*height:100vh;*/
            border: none;
            margin-top: 65px;
        }

        &-header {
            border: none !important;
        }
    }

    .o-footer {
        padding: 0px;
    }

    .content-container {
        padding: 0 0 0 24px;
        background: #fff;
        overflow: scroll !important;
    }

</style>
