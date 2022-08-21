import Mock from 'mockjs';

import './user';

import '@/views/userinfo/info/mock';
import '@/views/userinfo/setting/mock';

import '@/views/error/issue-details/mock';

import '@/views/overview/mock';

import '@/views/useraction/mock';

Mock.setup({
  timeout: '600-1000',
});
