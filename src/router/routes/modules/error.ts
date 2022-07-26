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
  children: [
    {
      path: 'issues',
      name: 'Issues',
      component: () => import('@/views/error/issues/index.vue'),
      meta: {
        locale: 'menu.error.issues',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'issue-details/:issueid', // 通过issueid返回对应的数据 再渲染到页面
      name: 'IssueDetails',
      component: () => import('@/views/error/issue-details/index.vue'),
      meta: {
        locale: 'menu.error.issueDetails',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default ERROR;
