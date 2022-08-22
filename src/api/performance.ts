import axios from 'axios';
// import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface FP {
  value: number;
  count: number;
}

export interface PageList {
  url: string;
}

export interface VisitCount {
  count: number;
  timestamp: string;
}

export interface WebVitals {
  overview: [
    {
      name: string;
      value: number;
    }
  ];
}

export interface stayDuration {
  stayDuration: number;
  timestamp: string;
}

export interface tagsInfo {
  name: string;
  value: number;
}

export interface tags {
  type: string;
  data: tagsInfo[];
}

export function queryOverviewData() {
  return axios({
    url: '/api/performance/page/overview',
    method: 'get',
  });
}

export function queryPageList(params: any) {
  return axios({
    url: '/api/performance/page/pagelist',
    method: 'get',
    params,
  });
}

export function queryPageInfoOverview(pageURL: any, params?: any) {
  return axios({
    url: `/api/performance/pageinfo/${pageURL}`,
    method: 'get',
    params,
  });
}

export function queryVisitCountList() {
  return axios.get<VisitCount[]>('/api/performance/pageinfo/visitCountList');
}

export function queryWebVitalsData() {
  return axios.get<WebVitals>('/api/performance/pageinfo/webvitals');
}

export function queryStayDurationData() {
  return axios.get<stayDuration[]>(
    '/api/performance/pageinfo/stayDurationList'
  );
}

export function queryTagsData() {
  return axios.get<[]>('/api/performance/pageinfo/tags');
}

export function queryLoadCostData() {
  return axios.get<FP[]>('/api/performance/api/loadCost');
}

export function queryApiOverviewData() {
  return axios.get('/api/performance/api/overview');
}

export function queryAPIList(params: any) {
  return axios({
    url: `/api/performance/api/apilist`,
    method: 'get',
    params,
  });
}

export function queryAPIInfoOverview(apiURL: any, params?: any) {
  return axios({
    url: `/api/performance/apiinfo/${apiURL}`,
    method: 'get',
    params,
  });
}

export function queryAPIVitalsData() {
  return axios.get<WebVitals>('/api/performance/api/apivitals');
}

export function queryPageListAPI() {
  return axios.get<any>('/api/performance/api/pagelist');
}
