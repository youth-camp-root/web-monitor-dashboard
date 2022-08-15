import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';
import qs from 'query-string';

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
  xAxis: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}

export function queryErrorOverview() {
  return axios.post<ErrorOverviewRes>('/api/error/issues/error-overview');
}
export interface ErrorList {
  name: 'API Error' | 'JS Error' | 'Resource Error';
  errorID: string;
  errorMsg: string;
  errorType:
    | 'jsError'
    | 'promiseError'
    | 'resourceError'
    | 'requestError'
    | 'blankscreenError';
  originURL: string;
  timestamp: string;
  userAffectCnt: number;
  TotalErrCnt: number;
  errorFreq: number[];
}

export interface ErrorListParams extends Partial<ErrorList> {
  current: number;
  pageSize: number;
}

export interface ErrorListRes {
  xAxis: string[];
  list: ErrorList[];
  total: number;
}

export function queryErrorList(params: ErrorListParams) {
  return axios.get<ErrorListRes>('/api/error/issues/errorlist', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
