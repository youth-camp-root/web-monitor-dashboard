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
    // error
    Mock.mock(new RegExp('/api/error/issues/error-overview'), () => {
      const generateLineData = (name: string) => {
        return {
          name,
          count: Mock.Random.natural(20, 2000),
          value: new Array(30)
            .fill(0)
            .map(() => Mock.Random.natural(800, 4000)),
        };
      };
      const xAxis = new Array(30).fill(0).map((_item, index) => {
        return `12.${index}`;
      });
      return successResponseWrap({
        xAxis,
        data: [
          generateLineData('Total Error'),
          generateLineData('JS Error'),
          generateLineData('API Error'),
          generateLineData('Resource Error'),
        ],
      });
    });
  },
});
