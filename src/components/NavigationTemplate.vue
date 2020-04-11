<template>
    <a-layout id="components-layout-demo-custom-trigger" class="o-section">
        <a-layout>
            <a-layout-sider theme="light" :trigger="null" collapsible v-model="collapsed" class="o-section-slider" v-if="!$isMobile()">
                <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']" class="o-section-nav">
                    <a-menu-item
                            key="rooms"
                            @click="goToRooms()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="home"/>
                        <span>Dom</span>
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
                        <a-icon type="dollar"/>
                        <span>Plaćanja</span>
                    </a-menu-item>
                    <a-divider></a-divider>
                    <a-menu-item
                            key="groceries"
                            @click="goToGroceries()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="appstore"/>
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
                <a-layout-header style="background: #fff; padding: 0">
                    <vue-page-transition name="fade-in-down">
                    <router-view name="header"></router-view>
                    </vue-page-transition>
                </a-layout-header>
                <a-layout-content
                        class="content-container" :style="{padding: $isMobile() ? '0' : '0 0 0 24px'}"
                >
                    <vue-page-transition name="fade-in-down">
                    <slot></slot>
                    </vue-page-transition>
                </a-layout-content>
                <a-layout-footer style="background: #FFF; padding: 0">
                    <vue-page-transition name="fade-in-up" >
                    <router-view name="footer" ></router-view>
                    </vue-page-transition>
                </a-layout-footer>
            </a-layout>
        </a-layout>
                <a-layout-footer class="o-footer" v-if="$isMobile()">
                        <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']" class="o-footer-nav" style="background: #1890ff !important;">
                            <a-menu-item
                                    key="devices"
                                    @click="goToRooms()"
                                    class="o-footer-menu-item"

                            >
                                <a-icon type="home" :style="{ fontSize: '30px', position: 'relative', top: '2px', margin: '0', padding: '16px 4px', color: '#FFF' }"/>
                            </a-menu-item>

                            <a-menu-item
                                    key="shopping"
                                    @click="goToShopping()"
                                    class="o-footer-menu-item"
                            >
                                <a-icon type="shopping" :style="{ fontSize: '30px', position: 'relative', top: '2px', padding: '16px 4px', color: '#FFF' }"/>
                            </a-menu-item>

                            <a-menu-item
                                    key="payments"
                                    @click="goToPayments()"
                                    class="o-footer-menu-item"
                            >
                                <a-icon type="dollar" :style="{ fontSize: '30px', position: 'relative', top: '2px', padding: '16px 4px', color: '#FFF' }"/>
                            </a-menu-item>
                            <a-menu-item
                                    key="groceriess"
                                    @click="goToGroceries()"
                                    class="o-footer-menu-item"
                            >
                                <a-icon type="appstore" :style="{ fontSize: '30px', position: 'relative', top: '2px', padding: '16px 4px', color: '#FFF' }"/>
                            </a-menu-item>

                            <a-menu-item
                                    key="recurringItems"
                                    @click="goToRecurringItems()"
                                    class="o-footer-menu-item"
                            >
                                <a-icon type="reload" :style="{ fontSize: '30px', position: 'relative', top: '1px', margin: '0', color: '#FFF' }"/>
                            </a-menu-item>
                        </a-menu>
                </a-layout-footer>
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

    private goToRooms() {
      if (this.$route.name !== RouteNames.Rooms) {
        this.$router.push({name: RouteNames.Rooms});
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
        height: 100%;

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
        text-align: center;
        padding: 0px;
        border-top: 1px solid #1890ff;
    }


</style>
