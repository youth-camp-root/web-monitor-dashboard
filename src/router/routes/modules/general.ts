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
  redirect: '/general/overview',
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index.vue'),
      meta: {
        locale: 'menu.user.overview',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default GENERAL;
