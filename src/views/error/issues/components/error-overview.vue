<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :title="$t('issuses.card.title.overview')">
      <div class="echart-data">
        <div class="selector-gp">
          <!-- <a-select
            v-model="showGraph.show"
            default-value="24h"
            class="select-two"
            style="width: 150px"
            :bordered="false"
            @change="handlechangeselector"
          >
            <a-option value="24h">24 hours</a-option>
            <a-option value="14d">14 days</a-option>
            <a-option value="30d">30 days</a-option>
          </a-select> -->
        </div>
        <a-statistic title="Today" :value="125670" show-group-separator>
          <template #suffix>
            <icon-arrow-rise />
          </template>
        </a-statistic>
      </div>
      <Chart
        v-if="showGraph.show === '24h'"
        style="height: 328px; margin-top: 20px"
        :option="chartOption"
      />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import useLoading from '@/hooks/loading';
  import { LineSeriesOption } from 'echarts';
  import { reactive, ref } from 'vue';
  import { queryErrorOverview } from '@/api/errorData';

  const { loading, setLoading } = useLoading(true);

  const showGraph = reactive({
    show: '24h',
  });
  const handlechangeselector = () => {
    console.log(showGraph.show);
  };

  const generateSeries = (name: string, data: number[]): LineSeriesOption => {
    return {
      name,
      data,
      type: 'line',
      showSymbol: false,
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#E0E3FF',
        },
      },
    };
  };

  const xAxis = ref<string[]>([]);
  const totalErrorData = ref<number[]>([]);
  const jsErrorData = ref<number[]>([]);
  const apiErrorData = ref<number[]>([]);
  const resourceErrorData = ref<number[]>([]);
  const { chartOption } = useChartOption((dark) => {
    return {
      legend: {
        data: ['Total Error', 'JS Error', 'API Error', 'Resource Error'],
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
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
            width: 1,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: dark ? '#2E2E30' : '#F2F3F5',
          },
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      tooltip: {
        trigger: 'axis',
        position(pt) {
          return [pt[0], '10%'];
        },
      },
      series: [
        generateSeries('Total Error', totalErrorData.value),
        generateSeries('JS Error', jsErrorData.value),
        generateSeries('API Error', apiErrorData.value),
        generateSeries('Resource Error', resourceErrorData.value),
      ],
    };
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await queryErrorOverview();
      xAxis.value = data.xAxis;
      data.data.forEach((el) => {
        if (el.name === 'Total Error') {
          totalErrorData.value = el.value;
        } else if (el.name === 'JS Error') {
          jsErrorData.value = el.value;
        } else if (el.name === 'API Error') {
          apiErrorData.value = el.value;
        }
        resourceErrorData.value = el.value;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped>
  .echart-data {
    display: flex;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
  }

  .selector-gp {
    justify-content: center;
    margin-top: 20px;
    margin-right: 50px;
  }

  :deep(.arco-statistic-title) {
    margin: 0;
  }
</style>