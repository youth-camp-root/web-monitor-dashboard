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
