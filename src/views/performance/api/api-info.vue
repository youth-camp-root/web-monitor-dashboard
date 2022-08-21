<template>
  <a-spin :loading="loading" style="width: 100%">
    <div class="container">
      <Breadcrumb
        :items="[
          'menu.performance',
          'menu.performance.api',
          'menu.performance.apiInfo',
        ]"
      />
      <a-card
        :bordered="false"
        :style="{
          borderRadius: '5px',
          width: '100%',
        }"
      >
        <a-row :gutter="30">
          <a-col :sm="24" :lg="18">
            <a-grid
              :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }"
              :col-gap="12"
              :row-gap="16"
            >
              <a-grid-item>
                <Chart
                  :option="visitCountOption"
                  :style="{ width: 'auto', height: '400px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
              <a-grid-item>
                <Chart
                  :option="APIVitalsOption"
                  :style="{ width: 'auto', height: '400px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
            </a-grid>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="6">
            <a-space direction="vertical" fill>
              <a-statistic title="错误统计" :value="2000" show-group-separator>
                <template #suffix>
                  <icon-arrow-rise :style="{ color: 'red' }" />
                </template>
              </a-statistic>
              <a-statistic
                title="应用页面数量"
                :value="pageList.totalCount"
                show-group-separator
              />
            </a-space>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="页面列表" :bordered="false" class="general-card">
        <a-list hoverable>
          <a-list-item v-for="item in pageList.data" :key="item.url">
            {{ item.url }}
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryVisitCountList,
    queryAPIVitalsData,
    WebVitals,
    queryPageListAPI,
  } from '@/api/performance';

  const { loading, setLoading } = useLoading(true);
  // console.log($t('performance.api.chart.title.visitcount'));

  const visitCountOption = ref({
    title: {
      text: '访问量',
      show: true,
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: [
      {
        type: 'category',
        data: [] as string[],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'count',
        type: 'line',
        data: [] as number[],
      },
    ],
  });
  const APIVitalsOption = ref({
    title: {
      text: '页面性能',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            // fontSize: '30',
            // fontWeight: 'bold',
          },
        },
        data: [] as unknown as WebVitals['overview'],
      },
    ],
  });
  interface PageList {
    totalCount: number;
    data: {
      url: string;
    }[];
  }
  const pageList = ref<PageList>({
    totalCount: 0,
    data: [],
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await queryVisitCountList();
      const count = data.map((item) => item.count);
      const timestamp = data.map((item) => item.timestamp);
      // console.log(res);
      visitCountOption.value.series[0].data = count;
      visitCountOption.value.xAxis[0].data = timestamp;
      const { data: APIVitalsData } = await queryAPIVitalsData();
      // console.log(webVitalsData);
      APIVitalsOption.value.series[0].data = APIVitalsData.overview;
      const { data: pageListRes } = await queryPageListAPI();

      pageList.value = pageListRes;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'APIInfo',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
