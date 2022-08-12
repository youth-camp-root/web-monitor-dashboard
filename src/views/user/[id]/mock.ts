import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { UserEventRecord, UserInfo } from '@/api/user';

import Mock, { Random } from 'mockjs';

export const userInfo: UserInfo = Mock.mock({
  objectId: Random.integer(1.84467441e19).toString(16),
  device: '',
  browser: '',
  OS: '',
  ip: '@ip',
});

export const userInfoList: UserEventRecord[] = Mock.mock({
  'list|100': [
    {
      'objectId|1-10': 1,
      'key|1-10': 1,
      'datetime': '@DATE',
      'type|1': ['error', 'event'],
      'title': '@title',
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
