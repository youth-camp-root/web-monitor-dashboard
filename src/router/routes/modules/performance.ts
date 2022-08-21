import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const PERFORMANCE: AppRouteRecordRaw = {
  path: '/performance',
  name: 'performance',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.performance',
    requiresAuth: true,
    icon: 'icon-thunderbolt',
    order: 3,
  },
  children: [
    {
      path: 'page',
      name: 'Page',
      component: () => import('@/views/performance/page/index.vue'),
      meta: {
        locale: 'menu.performance.page',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'pageinfo/:fdURL',
      name: 'PageInfo',
      component: () => import('@/views/performance/page/page-info.vue'),
      meta: {
        locale: 'menu.performance.pageInfo',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'api',
      name: 'API',
      component: () => import('@/views/performance/api/index.vue'),
      meta: {
        locale: 'menu.performance.api',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'apiinfo/:apiurl',
      name: 'APIInfo',
      component: () => import('@/views/performance/api/api-info.vue'),
      meta: {
        locale: 'menu.performance.apiInfo',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default PERFORMANCE;
