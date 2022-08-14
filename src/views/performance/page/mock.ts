import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const FCData = [
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

const visitCountData = [
  {
    count: 100,
    timestamp: '2019-01-01',
  },
  {
    count: 300,
    timestamp: '2019-01-02',
  },
  {
    count: 500,
    timestamp: '2019-01-03',
  },
  {
    count: 1000,
    timestamp: '2019-01-04',
  },
  {
    count: 1500,
    timestamp: '2019-01-05',
  },
  {
    count: 1000,
    timestamp: '2019-01-06',
  },
];

const webvitalsData = {
  overview: [
    {
      name: 'good',
      value: 120,
    },
    {
      name: 'medium',
      value: 50,
    },
    {
      name: 'bad',
      value: 30,
    },
  ],
};

const pageList = [
  {
    url: 'https://www.bilibili.com',
    pageid: '0',
  },
  {
    url: 'https://www.bilibili.com/video/BV14F411A7NQ',
    pageid: '1',
  },
  {
    url: 'https://www.bilibili.com/video/BV1Es411Z7jg',
    pageid: '2',
  },
];

// 停留时间
const stayDurationData = [
  {
    stayDuration: 1200,
    timestamp: '2019-01-01',
  },
  {
    stayDuration: 2000,
    timestamp: '2019-01-02',
  },
  {
    stayDuration: 1000,
    timestamp: '2019-01-03',
  },
  {
    stayDuration: 3000,
    timestamp: '2019-01-04',
  },
  {
    stayDuration: 5000,
    timestamp: '2019-01-05',
  },
];

// tags
const tagsData = [
  {
    type: 'browser',
    data: [
      {
        name: 'chrome',
        value: 400,
      },
      {
        name: 'firefox',
        value: 200,
      },
      {
        name: 'safari',
        value: 100,
      },
      {
        name: 'edge',
        value: 400,
      },
      {
        name: 'opera',
        value: 80,
      },
      {
        name: 'ie',
        value: 50,
      },
      {
        name: 'other',
        value: 200,
      },
    ],
  },
  {
    type: 'os',
    data: [
      {
        name: 'windows',
        value: 400,
      },
      {
        name: 'mac',
        value: 200,
      },
      {
        name: 'linux',
        value: 100,
      },
      {
        name: 'android',
        value: 200,
      },
      {
        name: 'ios',
        value: 180,
      },
      {
        name: 'other',
        value: 50,
      },
    ],
  },
  {
    type: 'device',
    data: [
      {
        name: 'mobile',
        value: 400,
      },
      {
        name: 'pc',
        value: 200,
      },
      {
        name: 'tablet',
        value: 100,
      },
      {
        name: 'other',
        value: 200,
      },
    ],
  },
];

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/perfomance/page/fc'), () => {
      return successResponseWrap([...FCData]);
    });
    Mock.mock(new RegExp('/api/perfomance/page/pagelist'), () => {
      return successResponseWrap([...pageList]);
    });
    Mock.mock(new RegExp('/api/perfomance/pageinfo/visitCountList'), () => {
      return successResponseWrap([...visitCountData]);
    });
    Mock.mock(new RegExp('/api/perfomance/pageinfo/webvitals'), () => {
      return successResponseWrap(webvitalsData);
    });
    Mock.mock(new RegExp('/api/perfomance/pageinfo/stayDurationList'), () => {
      return successResponseWrap([...stayDurationData]);
    });
    Mock.mock(new RegExp('/api/perfomance/pageinfo/tags'), () => {
      return successResponseWrap(tagsData);
    });
  },
});
