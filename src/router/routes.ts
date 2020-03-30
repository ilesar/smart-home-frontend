import { RouteConfig } from 'vue-router';
import {RouteNames} from '@/enums/RouteNames';
import Login from '@/views/Login.vue';
export const routes: RouteConfig[] = [
  {
    path: `/${RouteNames.login}`,
    name: RouteNames.login,
    component: loadView('Login'),
  },
  {
    path: '/',
    name: 'home',
    component: loadView('Home'),
  },
  {
    path: '/about',
    name: 'about',
    component: loadView('About'),
  },
  {
    path: '/secret',
    name: 'secret',
    component: loadView('Secret'),
  },
];
function loadView(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`); }
