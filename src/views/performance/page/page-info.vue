<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.performance',
        'menu.performance.page',
        'menu.performance.pageInfo',
      ]"
    />
    <a-card
      :bordered="false"
      :style="{
        borderRadius: '5px',
        width: '100%',
      }"
    >
      <a-row justify="space-between">
        <a-col :span="8">
          <Chart
            :option="visitCountOption"
            :style="{ width: 'auto', height: '200px' }"
            :auto-resize="true"
          >
          </Chart>
        </a-col>
        <a-col :span="8">
          <Chart
            :option="webVitalsOption"
            :style="{ width: 'auto', height: '200px' }"
            :auto-resize="true"
          >
          </Chart>
        </a-col>
        <a-col :span="8">
          <Chart
            :option="stayDurationOption"
            :style="{ width: 'auto', height: '200px' }"
            :auto-resize="true"
          >
          </Chart>
        </a-col>
      </a-row>
      <a-row justify="space-between">
        <a-col :span="8">
          <!-- <a-statistic></a-statistic> -->
          <a-typography-title :heading="5" bold="true"
            >错误统计</a-typography-title
          >
          <a-statistic title="" :value="3030" show-group-separator>
            <template #suffix>
              <icon-arrow-rise :style="{ color: 'red' }" />
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="8">
          <ratio-line
            v-for="item in tagsData"
            :key="item.type"
            :data="item"
          ></ratio-line>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryStayDurationData,
    queryTagsData,
    queryVisitCountList,
    queryWebVitalsData,
    WebVitals,
  } from '@/api/performance';
  import { useRouter } from 'vue-router';
  import RatioLine from './components/ratio-line.vue';

  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { pageid } = router.currentRoute.value.params;

  const visitCountOption = ref({
    title: {
      text: '访问量统计',
      show: true,
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['count'],
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
  const webVitalsOption = ref({
    title: {
      text: '页面性能',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [] as unknown as WebVitals['overview'],
      },
    ],
  });
  const stayDurationOption = ref({
    title: {
      text: '停留时间',
      show: true,
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['cost-time'],
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
        name: 'cost-time',
        type: 'line',
        data: [] as number[],
      },
    ],
  });
  const tagsData = ref({});
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await queryVisitCountList();
      const count = data.map((item) => item.count);
      const timestamp = data.map((item) => item.timestamp);
      // console.log(res);
      visitCountOption.value.series[0].data = count;
      visitCountOption.value.xAxis[0].data = timestamp;
      const { data: webVitalsData } = await queryWebVitalsData();
      // console.log(webVitalsData);
      webVitalsOption.value.series[0].data = webVitalsData.overview;
      const { data: stayDurationData } = await queryStayDurationData();
      // console.log(stayDurationData);
      const stayDuration = stayDurationData.map((item) => item.stayDuration);
      const stayDurationTimestamp = stayDurationData.map(
        (item) => item.timestamp
      );
      stayDurationOption.value.series[0].data = stayDuration;
      stayDurationOption.value.xAxis[0].data = stayDurationTimestamp;
      const { data: tagsDataRes } = await queryTagsData();
      tagsData.value = tagsDataRes;
      console.log(tagsData);
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
    name: 'PageInfo',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
