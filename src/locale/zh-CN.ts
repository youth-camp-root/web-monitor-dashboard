import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeUserDetail from '@/views/user/[id]/locale/zh-CN';

import localeErrorIssues from '@/views/error/issues/locale/zh-CN';
import localeErrorIssueDetails from '@/views/error/issue-details/locale/zh-CN';

import localePerformancePage from '@/views/performance/page/locale/zh-CN';
import localePerformanceHttp from '@/views/performance/api/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

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
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.userinfo': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
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
  ...localeSearchTable,
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
