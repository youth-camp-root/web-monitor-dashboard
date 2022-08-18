import Mock from 'mockjs';

import './user';
import './message-box';

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
