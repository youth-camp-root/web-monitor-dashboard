import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const USERINFO: AppRouteRecordRaw = {
  path: '/userinfo',
  name: 'userinfo',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.userinfo',
    icon: 'icon-user',
    requiresAuth: true,
    order: 107,
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/userinfo/info/index.vue'),
      meta: {
        locale: 'menu.userinfo.info',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/userinfo/setting/index.vue'),
      meta: {
        locale: 'menu.userinfo.setting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default USERINFO;
