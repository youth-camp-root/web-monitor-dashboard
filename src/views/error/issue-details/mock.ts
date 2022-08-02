import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const textList = [
  {
    key: 1,
    title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72045',
    increases: 35,
  },
  {
    key: 2,
    title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72310',
    increases: 35,
  },
  {
    key: 3,
    title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72198',
    increases: 35,
  },
  {
    key: 4,
    title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:75766',
    increases: 35,
  },
  {
    key: 5,
    title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:69967',
    increases: 35,
  },
];

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/error/issue-details/stack'), () => {
      return successResponseWrap([...textList]);
    });
  },
});
