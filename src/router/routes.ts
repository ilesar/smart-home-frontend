import {RouteConfig} from 'vue-router';
import {RouteNames} from '@/enums/RouteNames';
import Login from '@/views/Login.vue';

export const routes: RouteConfig[] = [
  {
    path: `/`,
    name: RouteNames.Home,
    redirect: `/${RouteNames.Rooms}`,
  },
  {
    path: `/${RouteNames.Login}`,
    name: RouteNames.Login,
    components: {
      default: loadView('Login'),
    },
  },
  {
    path: `/${RouteNames.Rooms}`,
    name: RouteNames.Rooms,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('Rooms'),
      header: loadView('headers/RoomsHeader'),
    },
  },
  {
    path: `/${RouteNames.Rooms}/:roomSlug/devices/:deviceSlug`,
    name: RouteNames.Configurations,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('devices/DeviceConfiguration'),
      header: loadView('headers/DeviceConfigurationHeader'),
    },
  },
  {
    path: `/${RouteNames.Rooms}/:roomSlug`,
    name: RouteNames.Devices,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('devices/Devices'),
      header: loadView('headers/DevicesHeader'),
    },
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
      header: loadView('headers/ShoppingHeader'),
      footer: loadView('footers/ShoppingFooter'),
    },
  },
  {
    path: '/shopping/history',
    name: RouteNames.ShoppingHistory,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('shopping/ShoppingHistory'),
      header: loadView('headers/ShoppingHistoryHeader'),
    },
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
      header: loadView('headers/PaymentHeader'),
      footer: loadView('footers/PaymentFooter'),
    },
  },
  {
    path: '/payments/history',
    name: RouteNames.PaymentHistory,
    meta: {
      navigationLayout: true,
      popup: true,
    },
    components: {
      default: loadView('payment/PaymentHistory'),
      header: loadView('headers/PaymentHistoryHeader'),
    },
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
      header: loadView('headers/GroceriesHeader'),
    },
  },
  {
    path: '/recurring-payments',
    name: RouteNames.RecurringPayments,
    meta: {
      navigationLayout: true,
      popup: true,
      disablePadding: true,
    },
    components: {
      default: loadView('RecurringPayments'),
      header: loadView('headers/RecurringPaymentsHeader'),
      footer: loadView('footers/RecurringPaymentsFooter'),
    },
  },
  {
    path: `/${RouteNames.Error}`,
    name: RouteNames.Error,
    components: {
      default: loadView('Error'),
    },
    meta: {
      navigationLayout: true,
    },
  },
  {
    path: `*`,
    redirect: `/${RouteNames.Error}`,
  },

];
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`); }
