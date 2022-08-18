<script lang="ts" setup>
  import { IUserStatRequest, queryUserStat } from '@/api/user';
  import useRequest from '@/hooks/request';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import BarChart from './charts/bar-chart.vue';
  import LineChart from './charts/line-chart.vue';

  const userID = useRoute().params.id as string;

  const { response } = useRequest<IUserStatRequest>(() =>
    queryUserStat(userID)
  );

  const pageData = computed(() => {
    return (
      response?.value?.page
        ?.map((item) => ({
          url: item.pageUrl,
          time: item.FCP,
        }))
        .reverse() ?? []
    );
  });

  const requestData = computed(() => {
    return (
      response?.value?.request
        ?.map((item) => ({
          url: item.targetURL,
          time: item.httpDuration,
        }))
        .reverse() ?? []
    );
  });
</script>

<template>
  <div>
    <a-grid :gutter="16" :cols="{ xs: 1, sm: 2, md: 2 }">
      <a-grid-item>
        <BarChart :title="$t('user.detail.chart.pageTime')" :data="pageData" />
      </a-grid-item>
      <a-grid-item>
        <BarChart
          :title="$t('user.detail.chart.requestTime')"
          :data="requestData"
        />
      </a-grid-item>
      <a-grid-item>
        <LineChart
          :title="$t('user.detail.chart.visitTrend')"
          :data="response?.trend"
        />
      </a-grid-item>
    </a-grid>
  </div>
</template>
