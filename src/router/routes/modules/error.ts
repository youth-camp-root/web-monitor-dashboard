import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const ERROR: AppRouteRecordRaw = {
  path: '/error',
  name: 'error',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.error',
    requiresAuth: true,
    icon: 'icon-close-circle',
    order: 2,
  },
};

export default ERROR;
