import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const GENERAL: AppRouteRecordRaw = {
  path: '/general',
  name: 'general',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.general',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index.vue'),
      meta: {
        locale: 'menu.overview',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'useraction',
      name: 'Useraction',
      component: () => import('@/views/useraction/index.vue'),
      meta: {
        locale: 'menu.useraction',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default GENERAL;
