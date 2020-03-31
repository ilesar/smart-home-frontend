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
                    <a-menu-item
                            key="groceries"
                            @click="goToGroceries()"
                            class="o-footer-menu-item"
                    >
                        <a-icon type="cloud"/>
                        <span>Namirnice</span>
                    </a-menu-item>
<!--                    <a-menu-item-->
<!--                            key="logout"-->
<!--                            @click="logout()"-->
<!--                            class="o-footer-menu-item"-->
<!--                    >-->
<!--                        <a-icon type="logout"/>-->
<!--                        <span>Odjavi se</span>-->
<!--                    </a-menu-item>-->
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
                    <a-page-header style="border: 1px solid rgb(235, 237, 240)" @back="() => null" title="Title" subTitle="This is a subtitle" class="o-section-header" />
                </a-layout-header>
                <a-layout-content
                        :style="{ padding: '24px', background: '#fff', minHeight: '280px' }"
                >
                    <slot></slot>
                </a-layout-content>
            </a-layout>

        </a-layout>
<!--        <Row>-->
<!--            <Col>-->
<!--                <a-layout-footer class="o-footer hide-on-mobile">-->
<!--                    <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']" class="o-footer-nav">-->
<!--                        <a-menu-item-->
<!--                                key="devices"-->
<!--                                @click="goToDevices()"-->
<!--                                class="o-footer-menu-item"-->

<!--                        >-->
<!--                            <a-icon type="bulb" theme="twoTone" :style="{ fontSize: '24px' }"/>-->
<!--                        </a-menu-item>-->

<!--                        <a-menu-item-->
<!--                                key="shopping"-->
<!--                                @click="goToShopping()"-->
<!--                                class="o-footer-menu-item"-->
<!--                        >-->
<!--                            <a-icon type="shopping" theme="twoTone" twoToneColor="#eb2f96" :style="{ fontSize: '24px' }"/>-->
<!--                        </a-menu-item>-->

<!--                        <a-menu-item-->
<!--                                key="payments"-->
<!--                                @click="goToPayments()"-->
<!--                                class="o-footer-menu-item"-->
<!--                        >-->
<!--                            <a-icon type="idcard" theme="twoTone" twoToneColor="#52c41a" :style="{ fontSize: '24px' }"/>-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item-->
<!--                                key="groceries"-->
<!--                                @click="goToGroceries()"-->
<!--                                class="o-footer-menu-item"-->
<!--                        >-->
<!--                            <a-icon type="cloud" theme="twoTone" twoToneColor="#c4891b" :style="{ fontSize: '24px' }"/>-->
<!--                        </a-menu-item>-->
<!--                    </a-menu>-->
<!--                </a-layout-footer>-->
<!--            </Col>-->
<!--        </Row>-->

    </a-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import User from '@/api/models/User.ts';
  import {RouteNames} from '@/enums/RouteNames';
  import {Row, Col} from 'ant-design-vue';

  @Component({
    name: 'NavigationTemplate',
    components: {
      Row,
      Col,
    },
  })
  export default class NavigationTemplate extends Vue {
    private defaultSelectedKeys: string[] = [];

    private collapsed: boolean = true;

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

</style>