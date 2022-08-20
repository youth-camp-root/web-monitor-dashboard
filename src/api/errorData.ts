import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';
// import qs from 'query-string';

// 这个是 mongodb 的接口类型
export interface IErrorData {
  name: string;
  details: {
    TotalErrCnt: number;
    errorFreq: number[];
    userAffectCnt: number;
  };
  info: {
    _id: {
      $oid: string;
    };
    _cls: string;
    category: string;
    originURL: string;
    timestamp: {
      $date: string;
    };
    errorType: string;
    errorMsg: string;
    filename: string;
    position: string;
    stack: string;
    selector: string;
    user: {
      _id: {
        $oid: string;
      };
      browser: string;
      device: string;
      ip: string;
      os: string;
      page: string;
      tag: string;
    };
    viewPoint: string;
  };
}

export interface ErrorDetailData {
  name: string;
  details: {
    TotalErrCnt: number;
    errorFreq: number[];
    userAffectCnt: number;
  };
  info: {
    _id: {
      $oid: string;
    };
    _cls: string;
    category: string;
    originURL: string;
    timestamp: {
      $date: string;
    };
    errorType: string;
    errorMsg: string;
    filename: string;
    position: string;
    stack: string;
    selector: string;
    viewPoint: string;
  };
  user: {
    user: {
      _id: {
        $oid: string;
      };
      browser: string;
      device: string;
      ip: string;
      os: string;
      page: string;
      tag: string;
    };
  };
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryErrorIssueStack() {
  return axios.get<TableData[]>('/api/error/issue-details/stack');
}

export interface ErrorOverviewRes {
  dateList: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}

// export function queryErrorOverview() {
//   return axios.post<ErrorOverviewRes>('/api/error/issues/error-overview');
// }
export function queryErrorOverview() {
  return axios.get('/api/error/issues/error-overview');
}

export interface ErrorList {
  name: string;
  info: {
    errorID: string;
    errorMsg: string;
    errorType: string;
    originURL: string;
    timestamp: string;
    [key: string]: any;
  };
  details: {
    userAffectCnt: number;
    TotalErrCnt: number;
    errorFreq: number[];
  };
}

export interface ErrorListParams extends Partial<ErrorList> {
  current: number;
  pageSize: number;
}

export interface ErrorListRes {
  dateList: string[];
  list: ErrorList[];
  total: number;
}

// export function queryErrorList() {
//   return axios.get<ErrorListRes>('/api/error/issues/errorlist', {
//     paramsSerializer: (obj) => {
//       return qs.stringify(obj);
//     },
//   });
// }

export function queryErrorList() {
  return axios.get('/api/error/issues/list?page=1&items=20');
}

export function queryErrorIssue(issueId: string) {
  return axios.get(`/api/error/issue/${issueId}`);
}
