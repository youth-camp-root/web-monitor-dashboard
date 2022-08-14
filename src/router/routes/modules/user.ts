import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
    // hideChildrenInMenu: true,
  },
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
    {
      path: 'useraction',
      name: 'Useraction',
      component: () => import('@/views/useraction/index.vue'),
      meta: {
        locale: 'menu.useraction',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: ':id',
      name: 'UserDetail',
      component: () => import('@/views/user/[id]/index.vue'),
      meta: {
        locale: 'menu.user.detail',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default USER;
