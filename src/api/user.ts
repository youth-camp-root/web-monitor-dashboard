import axios from 'axios';
import { IErrorData } from './errorData';
import { IRequestData } from './requestData';

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

export type IUserRequest = {
  user: IUserFull;
  errors: IErrorData[];
  events: IRequestData[];
};

export type IUserStatRequest = {
  page: {
    FCP: number;
    pageUrl: string;
  }[];
  request: {
    httpDuration: number;
    targetURL: string;
  }[];
  trend: {
    count: number;
  }[];
};

export function queryUserInfo(id: string) {
  return axios.get(`/api/user/${id}`);
}

export function queryUserStat(id: string) {
  return axios.get(`/api/user/${id}/stat`);
}

export function queryUserChartInfo() {
  return axios.get('/api/user/chart');
}
