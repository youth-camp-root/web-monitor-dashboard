import axios from 'axios';

export interface UserInfo {
  objectId: string;
  device: string;
  browser: string;
  OS: string;
  ip: string;
}

export interface UserEventRecord {
  objectId: string;
  datetime: string;
  type: 'error' | 'event';
}

export function queryUserInfo(id: string) {
  return axios.get(`/api/user/profile/${id}`);
}

export function queryUserChartInfo() {
  return axios.get('/api/user/chart');
}
