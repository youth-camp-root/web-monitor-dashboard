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

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: 44,
        right: 20,
        top: 0,
        bottom: 20,
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
        data: ['/user', '/performance', '/error', '/detail', '/home'],
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
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          data: [1033, 1244, 1520, 2000, 2300],
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
