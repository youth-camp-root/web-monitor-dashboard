<template>
  <a-descriptions
    :column="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
    :data="renderData"
    bordered
  ></a-descriptions>
</template>

<script setup lang="ts">
  import { DescData } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { computed, PropType } from 'vue';
  import { IUserFull } from '@/api/user';

  const { t } = useI18n();

  const props = defineProps({
    data: {
      type: Object as PropType<IUserFull>,
    },
  });

  const renderData = computed<DescData[]>(() => [
    // eslint-disable-next-line no-underscore-dangle
    { label: t('user.detail.objectId'), value: props.data?._id.$oid ?? '' },
    { label: t('user.detail.device'), value: props.data?.device ?? '' },
    { label: t('user.detail.OS'), value: props.data?.os ?? '' },
    { label: t('user.detail.ip'), value: props.data?.ip ?? '' },
    { label: t('user.detail.browser'), value: props.data?.browser ?? '' },
  ]);
</script>

<style scoped></style>
