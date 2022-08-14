import axios from 'axios';
// import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface FP {
  value: number;
  count: number;
}

export interface PageList {
  url: string;
  pageid: string;
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

export function queryFPData() {
  return axios.get<FP[]>('/api/perfomance/page/fc');
}

export function queryPageList() {
  return axios.get<PageList[]>('/api/perfomance/page/pagelist');
}

export function queryVisitCountList() {
  return axios.get<VisitCount[]>('/api/perfomance/pageinfo/visitCountList');
}

export function queryWebVitalsData() {
  return axios.get<WebVitals>('/api/perfomance/pageinfo/webvitals');
}

export function queryStayDurationData() {
  return axios.get<stayDuration[]>('/api/perfomance/pageinfo/stayDurationList');
}

export function queryTagsData() {
  return axios.get<[]>('/api/perfomance/pageinfo/tags');
}

export function queryLoadCostData() {
  return axios.get<FP[]>('/api/performance/api/loadCost');
}

export function queryAPIList() {
  return axios.get<PageList[]>('/api/perfomance/api/apilist');
}

export function queryAPIVitalsData() {
  return axios.get<WebVitals>('/api/perfomance/api/apivitals');
}

export function queryPageListAPI() {
  return axios.get<any>('/api/perfomance/api/pagelist');
}
