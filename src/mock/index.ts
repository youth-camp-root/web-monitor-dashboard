import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/workplace/mock';

import '@/views/dashboard/monitor/mock';

import '@/views/list/card/mock';
import '@/views/list/search-table/mock';

import '@/views/form/step/mock';

import '@/views/profile/basic/mock';

import '@/views/visualization/data-analysis/mock';
import '@/views/visualization/multi-dimension-data-analysis/mock';

import '@/views/userinfo/info/mock';
import '@/views/userinfo/setting/mock';

import '@/views/user/[id]/mock';

import '@/views/error/issue-details/mock';

import '@/views/overview/mock';

import '@/views/useraction/mock';

import '@/views/performance/page/mock';
import '@/views/performance/api/mock';

Mock.setup({
  timeout: '600-1000',
});
