<template>
  <a-card
    class="general-card"
    :title="$t('multiDAnalysis.card.title.userActions')"
  >
    <Chart :option="chartOption" autoresize />
  </a-card>
</template>

<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import { PropType } from 'vue';

  type IChartData = {
    url: string;
    time: number;
  };

  const data = defineProps({
    data: {
      type: Object as PropType<IChartData[]>,
    },
  });

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        top: 0,
        bottom: 0,
        left: 130,
        right: 20,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return String(value);
            return `${Number(value) / 1000}s`;
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#484849' : '#E5E8EF',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: data.data?.map((item) => item.url),
        axisLabel: {
          show: true,
          color: '#4E5969',
          formatter(item: string) {
            return item.substring(0, 20);
          },
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
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          data: data.data?.map((item) => item.time),
          type: 'bar',
          barWidth: 14,
          itemStyle: {
            color: ({ dataIndex }) => {
              return dataIndex % 2 ? '#468DFF' : '#86DF6C';
            },
            borderRadius: 2,
          },
        },
      ],
    };
  });
</script>

<style scoped lang="less"></style>
