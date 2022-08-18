import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeUserDetail from '@/views/user/[id]/locale/en-US';

import localeErrorIssues from '@/views/error/issues/locale/en-US';
import localeErrorIssueDetails from '@/views/error/issue-details/locale/en-US';

import localePerformancePage from '@/views/performance/page/locale/en-US';
import localePerformanceHttp from '@/views/performance/api/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeMonitor from '@/views/dashboard/monitor/locale/en-US';

// import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeCardList from '@/views/list/card/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeBasicProfile from '@/views/profile/basic/locale/en-US';

import localeSuccess from '@/views/result/success/locale/en-US';
import localeError from '@/views/result/error/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

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
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.userinfo': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeOverview,
  ...localeUserDetail,

  ...localeErrorIssues,
  ...localeErrorIssueDetails,

  ...localePerformancePage,
  ...localePerformanceHttp,

  ...localeWorkplace,

  ...localeMonitor,
  // ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  ...localUserActionSearch,
};
