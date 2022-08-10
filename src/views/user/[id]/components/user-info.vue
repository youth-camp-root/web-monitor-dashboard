<template>
  <a-descriptions
    :column="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
    :data="renderData"
    bordered
  ></a-descriptions>
</template>

<script setup lang="ts">
  import useRequest from '@/hooks/request';
  import { useRoute } from 'vue-router';
  import { queryUserInfo, UserInfo } from '@/api/user';
  import { DescData } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';
  import { userInfo } from '@/views/user/[id]/mock';

  const { t } = useI18n();
  const route = useRoute();

  const defaultValue: UserInfo = userInfo;

  const { response: data } = useRequest<UserInfo>(() => {
    return queryUserInfo(route.params.id as string);
  }, defaultValue);

  const renderData = computed<DescData[]>(() => [
    { label: t('user.detail.objectId'), value: data.value.objectId },
    { label: t('user.detail.device'), value: data.value.device },
    { label: t('user.detail.browser'), value: data.value.browser },
    { label: t('user.detail.OS'), value: data.value.OS },
    { label: t('user.detail.ip'), value: data.value.ip },
  ]);
</script>

<style scoped></style>
