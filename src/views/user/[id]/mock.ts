import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { UserInfo } from '@/api/user';

import Mock, { Random } from 'mockjs';

export const userInfo: UserInfo = Mock.mock({
  objectId: Random.integer(1.84467441e19).toString(16),
  device: '',
  browser: '',
  OS: '',
  ip: '@ip',
});

export const otherInfo = {}; // TODO: add other info

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/user/profile'), () => {
      return successResponseWrap(userInfo);
    });
  },
});
