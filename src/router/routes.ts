import {RouteConfig} from 'vue-router';
import {RouteNames} from '@/enums/RouteNames';
import Login from '@/views/Login.vue';

export const routes: RouteConfig[] = [
  {
    path: `/${RouteNames.Login}`,
    name: RouteNames.Login,
    components: {
      default: loadView('Login'),
    }
  },
  {
    path: '/',
    name: RouteNames.Devices,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('Devices'),
      header: loadView('headers/DevicesHeader')
    }
  },
  {
    path: '/shopping',
    name: RouteNames.Shopping,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('Shopping'),
      header: loadView('headers/ShoppingHeader')
    }
  },
  {
    path: '/shopping/history',
    name: RouteNames.ShoppingHistory,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('shopping/History'),
      header: loadView('shopping/HistoryHeader')
    }
  },
  {
    path: '/payments',
    name: RouteNames.Payments,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('Payment'),
      header: loadView('headers/PaymentHeader')
    }
  },
  {
    path: '/groceries',
    name: RouteNames.Groceries,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('Groceries'),
      header: loadView('headers/GroceriesHeader')
    }
  },

];
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`); }
