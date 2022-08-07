<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.detail']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card :title="$t('user.detail.userInfo.title')">
        <UserInfo />
      </a-card>
      <a-card :title="$t('user.detail.userCharts.title')">
        <UserCharts />
      </a-card>
      <a-card :title="$t('user.detail.userInfoList.title')">
        <UserInfoList />
      </a-card>
    </a-space>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Breadcrumb from '@/components/breadcrumb/index.vue';
  import UserInfo from './components/UserInfo.vue';
  import UserCharts from './components/UserCharts.vue';
  import UserInfoList from './components/UserInfoList.vue';

  const route = useRoute();
  const { id } = route.params;

  // TODO: add logic for retrieving data from backend.
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
