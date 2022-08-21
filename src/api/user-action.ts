import { Pagination } from '@/types/global';
import axios from 'axios';

export function queryUserList(
  pagination: Pagination = {
    current: 1,
    pageSize: 10,
  }
) {
  return axios.get('api/useraction/all', {
    params: pagination,
  });
}

export function queryUserListId(
  pagination: Pagination = { current: 1, pageSize: 10 },
  id: string
) {
  return axios.get('api/useraction/one', {
    params: {
      ...pagination,
      id,
    },
  });
}
