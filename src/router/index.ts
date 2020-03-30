/* eslint-disable */
import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { RouteGuardService } from '@/services/RouteGuardService';

Vue.use(Router);

import { routes } from './routes';

/**
 * 动态路由
 */
const requiredRoute = require.context('.', false, /\.ts$/);

requiredRoute.keys().forEach((key) => {
  if (key === './index.ts' || key === './routes.ts') { return; }
  routes.push(requiredRoute(key).default || requiredRoute(key));
});

const router = new Router({
  routes: routes as RouteConfig[],
  mode: 'history',
  base: process.env.BASE_URL,
});

// router gards
router.beforeEach((to: any, from: any, next: any) => {
  console.log('Going From ' + from.path + ' to ' + to.path);
  next();
});

router.afterEach((to: any, from: any) => {
  console.log('Arrived ' + to.path + ' from ' + from.path);
});

const routeGuar = new RouteGuardService(router);

export default router;
