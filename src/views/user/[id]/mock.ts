import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { UserInfo } from '@/api/user';

import Mock, { Random } from 'mockjs';
import { TableData } from '@arco-design/web-vue';

export const userInfo: UserInfo = Mock.mock({
  objectId: Random.integer(1.84467441e19).toString(16),
  device: '',
  browser: '',
  OS: '',
  ip: '@ip',
});

export const userInfoList: TableData[] = Mock.mock({
  'list|1-10': [
    {
      'key|1-10': 1,
      'datetime': '@DATE',
      'salary': 23000,
    },
  ],
}).list;
export const otherInfo = {}; // TODO: add other info

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/user/profile'), () => {
      return successResponseWrap(userInfo);
    });
  },
});
