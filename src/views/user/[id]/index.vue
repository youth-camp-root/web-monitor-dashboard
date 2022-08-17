<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.detail']" />
    <a-spin :loading="loading">
      <a-space direction="vertical" :size="16" fill>
        <a-card :title="$t('user.detail.userInfo.title')">
          <UserInfo :id="id" :data="data.user" />
        </a-card>
        <a-card :title="$t('user.detail.userCharts.title')">
          <UserCharts />
        </a-card>
        <a-card :title="$t('user.detail.userInfoList.title')">
          <UserInfoList />
        </a-card>
      </a-space>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Breadcrumb from '@/components/breadcrumb/index.vue';
  import useRequest from '@/hooks/request';
  import { IUserFull, queryUserInfo } from '@/api/user';
  import UserInfo from '@/views/user/[id]/components/user-info.vue';
  import UserCharts from '@/views/user/[id]/components/user-charts.vue';
  import UserInfoList from '@/views/user/[id]/components/user-info-list.vue';
  import { IErrorData } from '@/api/errorData';
  import { IRequestData } from '@/api/requestData';

  type IUserRequest = {
    user: IUserFull;
    errors: IErrorData[];
    events: IRequestData[];
  };

  const route = useRoute();
  const id = route.params.id as string;

  const { loading, response: data } = useRequest<IUserRequest>(() =>
    queryUserInfo(id)
  );
</script>

<script lang="ts">
  export default {
    name: 'UserDetail',
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
  }
</style>
