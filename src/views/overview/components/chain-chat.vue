<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :title="props.title"
      :header-style="{ paddingBottom: '12px', margin: '10px' }"
    >
      <template #extra>
        <a-statistic
          extra="较一周之前"
          :value="50.52"
          :precision="2"
          :value-style="{ color: '#0fbf60' }"
        >
          <template #prefix>
            <icon-arrow-rise />
          </template>
          <template #suffix>%</template>
        </a-statistic>
      </template>
      <Chart
        style="height: 328px; margin-top: 20px"
        :option="chartOption"
        autoresize
      />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  //   import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import { queryDataOverview } from '@/api/visualization';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  //   import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  });
  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
      )
      .reverse()
      .join('');
  };

  const generateSeries = (
    name: string,
    lineColor: string,
    itemBorderColor: string,
    data: number[]
  ): LineSeriesOption => {
    return {
      name,
      data,
      stack: 'Total',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: lineColor,
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          color: lineColor,
          borderWidth: 2,
          borderColor: itemBorderColor,
        },
      },
      lineStyle: {
        width: 2,
        color: lineColor,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
        color: lineColor,
      },
    };
  };
  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const contentProductionData = ref<number[]>([]);
  const contentClickData = ref<number[]>([]);
  const { chartOption } = useChartOption((dark) => {
    return {
      grid: {
        left: 44,
        right: 20,
        top: 0,
        bottom: 20,
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          show: true,
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return String(value);
            return `${value / 1000}k`;
          },
        },
        splitLine: {
          lineStyle: {
            color: dark ? '#2E2E30' : '#F2F3F5',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: '2.6%',
            bottom: '18',
            style: {
              text: '12.10',
              textAlign: 'center',
              fill: '#4E5969',
              fontSize: 12,
            },
          },
          {
            type: 'text',
            right: '0',
            bottom: '18',
            style: {
              text: '12.17',
              textAlign: 'center',
              fill: '#4E5969',
              fontSize: 12,
            },
          },
        ],
      },
      series: [
        generateSeries(
          '活跃用户数',
          '#722ED1',
          '#F5E8FF',
          contentProductionData.value
        ),
        generateSeries(
          '内容生产量',
          '#F77234',
          '#FFE4BA',
          contentClickData.value
        ),
      ],
    };
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await queryDataOverview();
      xAxis.value = data.xAxis;
      data.data.forEach((el) => {
        if (el.name === '内容生产量') {
          contentProductionData.value = el.value;
        }
        contentClickData.value = el.value;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  :deep(.arco-statistic) {
    .arco-statistic-title {
      color: rgb(var(--gray-10));
      font-weight: bold;
    }

    .arco-statistic-value {
      display: flex;
      align-items: center;
    }
  }

  .statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
  }
</style>
