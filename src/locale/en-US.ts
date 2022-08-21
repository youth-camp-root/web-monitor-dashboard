import localeLogin from '@/views/login/locale/en-US';

import localeUserDetail from '@/views/user/[id]/locale/en-US';

import localeErrorIssues from '@/views/error/issues/locale/en-US';
import localeErrorIssueDetails from '@/views/error/issue-details/locale/en-US';

import localePerformancePage from '@/views/performance/page/locale/en-US';
import localePerformanceHttp from '@/views/performance/api/locale/en-US';

import localeUserInfo from '@/views/userinfo/info/locale/en-US';
import localeUserSetting from '@/views/userinfo/setting/locale/en-US';
import localeOverview from '@/views/overview/locale/en-US';

import localUserActionSearch from '@/views/useraction/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'menu.general': 'General',
  'menu.overview': 'Overview',
  'menu.useraction': 'Detailed user check',
  'menu.user': 'User',
  'menu.user.detail': 'Details',
  'menu.error': 'Error',
  'menu.performance': 'Performance',
  'menu.dashboard': 'Dashboard',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.logout': 'Log out',
  'navbar.action.locale': 'Switch to English',
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
