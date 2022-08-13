import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';

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
