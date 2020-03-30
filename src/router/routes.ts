import {RouteConfig} from 'vue-router';
import {RouteNames} from '@/enums/RouteNames';
import Login from '@/views/Login.vue';

export const routes: RouteConfig[] = [
  {
    path: `/${RouteNames.Login}`,
    name: RouteNames.Login,
    component: loadView('Login'),
  },
  {
    path: '/',
    name: RouteNames.Devices,
    component: loadView('Devices'),
    meta: {navigationLayout: true},
  },
  {
    path: '/shopping',
    name: RouteNames.Shopping,
    component: loadView('Shopping'),
    meta: {navigationLayout: true},
  },
  {
    path: '/payments',
    name: RouteNames.Payments,
    component: loadView('Payment'),
    meta: {navigationLayout: true},
  },
  {
    path: '/groceries',
    name: RouteNames.Groceries,
    component: loadView('Groceries'),
    meta: {navigationLayout: true},
  },

];
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`); }
