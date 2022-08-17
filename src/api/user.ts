import axios from 'axios';

export interface UserInfo {
  _id: string;
  browser: string;
  device: string;
  ip: string;
  os: string;
}

export interface UserEventRecord {
  objectId: string;
  datetime: string;
  type: 'error' | 'event';
}

export type IUserFull = {
  _id: {
    $oid: string;
  };
  browser: string;
  device: string;
  ip: string;
  os: string;
};

export function queryUserInfo(id: string) {
  return axios.get(`/api/user/${id}`);
}

export function queryUserChartInfo() {
  return axios.get('/api/user/chart');
}
