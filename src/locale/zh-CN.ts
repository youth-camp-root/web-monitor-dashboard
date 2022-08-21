import localeLogin from '@/views/login/locale/zh-CN';

import localeUserDetail from '@/views/user/[id]/locale/zh-CN';

import localeErrorIssues from '@/views/error/issues/locale/zh-CN';
import localeErrorIssueDetails from '@/views/error/issue-details/locale/zh-CN';

import localePerformancePage from '@/views/performance/page/locale/zh-CN';
import localePerformanceHttp from '@/views/performance/api/locale/zh-CN';

import localeUserInfo from '@/views/userinfo/info/locale/zh-CN';
import localeUserSetting from '@/views/userinfo/setting/locale/zh-CN';

import localeOverview from '@/views/overview/locale/zh-CN';

import localUserActionSearch from '@/views/useraction/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.general': '概览',
  'menu.overview': '首页',
  'menu.useraction': '用户细查',
  'menu.user': '用户',
  'menu.user.detail': '详情',
  'menu.error': '错误',
  'menu.performance': '性能',
  'menu.dashboard': '仪表盘',
  'menu.logout': '退出登录',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeLogin,

  ...localeOverview,

  ...localeUserDetail,

  ...localeErrorIssues,
  ...localeErrorIssueDetails,

  ...localePerformancePage,
  ...localePerformanceHttp,

  ...localeUserInfo,
  ...localeUserSetting,
  ...localUserActionSearch,
};
