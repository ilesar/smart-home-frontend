import {RouteConfig} from 'vue-router';
import {RouteNames} from '@/enums/RouteNames';
import Login from '@/views/Login.vue';

export const routes: RouteConfig[] = [
  {
    path: `/${RouteNames.Login}`,
    name: RouteNames.Login,
    component: loadView('Login'),
    components: {
    }
  },
  {
    path: '/',
    name: RouteNames.Devices,
    meta: {navigationLayout: true},
    components: {
      default: loadView('Devices'),
      header: loadView('headers/DevicesHeader')
    }
  },
  {
    path: '/shopping',
    name: RouteNames.Shopping,
    meta: {navigationLayout: true},
    components: {
      default: loadView('Shopping'),
      header: loadView('headers/ShoppingHeader')
    }
  },
  {
    path: '/payments',
    name: RouteNames.Payments,
    component: loadView('Payment'),
    meta: {navigationLayout: true},
    components: {
      default: loadView('Payment'),
      header: loadView('headers/PaymentHeader')
    }
  },
  {
    path: '/groceries',
    name: RouteNames.Groceries,
    component: loadView('Groceries'),
    meta: {navigationLayout: true},
    components: {
      default: loadView('Groceries'),
      header: loadView('headers/GroceriesHeader')
    }
  },

];
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`); }
