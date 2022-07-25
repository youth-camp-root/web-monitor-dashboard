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
};

export default PERFORMANCE;
