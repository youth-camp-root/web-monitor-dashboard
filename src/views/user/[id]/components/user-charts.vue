<template>
  <div>
    <a-grid :gutter="16" :cols="{ xs: 1, sm: 2, md: 3 }">
      <a-grid-item>
        <BarChart
          :title="$t('user.detail.chart.pageTime')"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-grid-item>
      <a-grid-item>
        <BarChart
          :title="$t('user.detail.chart.requestTime')"
          quota="userRetention"
          chart-type="bar"
        />
      </a-grid-item>
      <a-grid-item>
        <LineChart
          :title="$t('user.detail.chart.visitTrend')"
          quota="contentConsumptionTrends"
          chart-type="line"
        />
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import BarChart from './charts/bar-chart.vue';
  import LineChart from './charts/line-chart.vue';

  const data = inject('user/[id]/info');
</script>
