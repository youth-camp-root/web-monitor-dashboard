<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <BarChart
          :title="$t('user.detail.chart.pageTime')"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="8">
        <BarChart
          :title="$t('user.detail.chart.requestTime')"
          quota="userRetention"
          chart-type="bar"
        />
      </a-col>
      <a-col :span="8">
        <LineChart
          :title="$t('user.detail.chart.visitTrend')"
          quota="contentConsumptionTrends"
          chart-type="line"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import BarChart from './charts/bar-chart.vue';
  import LineChart from './charts/line-chart.vue';
</script>
