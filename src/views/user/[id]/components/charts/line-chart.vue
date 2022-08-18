<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import dataChainGrowthVue from '@/views/overview/components/data-chain-growth.vue';
  import { PropType } from 'vue';

  const props = defineProps({
    data: {
      type: Object as PropType<{ count: number }[]>,
    },
  });

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: 44,
        right: 20,
        top: 10,
        bottom: 20,
      },
      xAxis: {
        type: 'category',
        data: ['-7d', '-6d', '-5d', '-4d', '-3d', '-2d', '-1d'],
        axisLabel: {
          show: true,
          color: '#4E5969',
        },
        axisTick: {
          show: true,
          length: 2,
          lineStyle: {
            color: '#A9AEB8',
          },
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: isDark ? '#484849' : '#A9AEB8',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          color: '#4E5969',
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#484849' : '#E5E8EF',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          data: props.data?.map((item) => item.count),
          type: 'line',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            color: '#4080FF',
          },
        },
      ],
    };
  });
</script>

<template>
  <a-card
    class="general-card"
    :title="$t('multiDAnalysis.card.title.userActions')"
  >
    <Chart :option="chartOption" autoresize />
  </a-card>
</template>

<style scoped lang="less"></style>
