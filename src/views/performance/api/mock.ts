import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const loadCostData = [
  {
    value: 200,
    count: 100,
  },
  {
    value: 300,
    count: 300,
  },
  {
    value: 500,
    count: 300,
  },
  {
    value: 1000,
    count: 100,
  },
  {
    value: 1500,
    count: 30,
  },
  {
    value: 2000,
    count: 5,
  },
];

const apiList = [
  {
    url: '/aaa',
    apiid: '0',
  },
  {
    url: '/bbb',
    apiid: '1',
  },
  {
    url: '/ccc',
    apiid: '2',
  },
];

const apivitalsData = {
  overview: [
    {
      name: 'good',
      value: 150,
    },
    {
      name: 'medium',
      value: 30,
    },
    {
      name: 'bad',
      value: 10,
    },
  ],
};

const pageList = {
  data: [
    {
      url: 'https://www.TEST.com',
      pageid: '0',
    },
    {
      url: 'https://www.TEST.com/exampleA',
      pageid: '1',
    },
    {
      url: 'https://www.TEST.com/exampleB',
      pageid: '2',
    },
    {
      url: 'https://www.TEST.com/exampleC',
      pageid: '3',
    },
  ],
  totalCount: 4,
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/perfomance/api/loadCost'), () => {
      return successResponseWrap([...loadCostData]);
    });
    Mock.mock(new RegExp('/api/perfomance/api/apilist'), () => {
      return successResponseWrap([...apiList]);
    });
    Mock.mock(new RegExp('/api/perfomance/api/apivitals'), () => {
      return successResponseWrap(apivitalsData);
    });
    Mock.mock(new RegExp('/api/perfomance/api/pagelist'), () => {
      return successResponseWrap(pageList);
    });
  },
});
