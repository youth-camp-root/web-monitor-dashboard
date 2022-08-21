<template>
  <a-spin :loading="loading" style="width: 100%">
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
        <a-row :gutter="30">
          <a-col :sm="24" :lg="18">
            <a-grid
              :cols="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 2 }"
              :col-gap="12"
              :row-gap="16"
            >
              <a-grid-item>
                <Chart
                  :option="visitCountOption"
                  :style="{ width: 'auto', height: '200px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
              <a-grid-item>
                <Chart
                  :option="stayDurationOption"
                  :style="{ width: 'auto', height: '200px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
              <a-grid-item>
                <Chart
                  :option="webVitalsOption"
                  :style="{ width: 'auto', height: '200px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
            </a-grid>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="6">
            <div>
              <a-typography-title :heading="5" bold="true">
                {{ $t('performance.page.overview.errorcount') }}
              </a-typography-title>
              <a-statistic title="" :value="3030" show-group-separator>
                <template #suffix>
                  <icon-arrow-rise :style="{ color: 'red' }" />
                </template>
              </a-statistic>
              <a-link @click="gotoErrorPage">{{
                $t('performance.page.overview.errorcount.viewmore')
              }}</a-link>
              <a-typography-title :heading="5" bold="true">
                {{ $t('performance.page.overview.visittags') }}
              </a-typography-title>
              <ratio-line
                v-for="item in tagsData"
                :key="item.type"
                :data="item"
              ></ratio-line>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryStayDurationData,
    queryTagsData,
    queryVisitCountList,
    queryWebVitalsData,
    WebVitals,
  } from '@/api/performance';
  import router from '@/router';
  import { useI18n } from 'vue-i18n';
  import RatioLine from './components/ratio-line.vue';

  const { pageid, fdURL } = router.currentRoute.value.params;

  const { loading, setLoading } = useLoading();
  const { t } = useI18n();
  const visitCountOption = ref({
    title: {
      text: t('performance.page.chart.title.pageloadtime'),
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
      text: t('performance.page.chart.title.webvitals'),
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'right',
      orient: 'vertical',
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
          },
        },
        data: [] as unknown as WebVitals['overview'],
      },
    ],
  });
  const stayDurationOption = ref({
    title: {
      text: t('performance.page.chart.title.staydurationtime'),
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
  const tagsData = ref<any>({});
  const gotoErrorPage = () => {
    router.push({
      path: '/error',
      query: {
        fdURL,
      },
    });
  };
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
      // console.log(tagsData);
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
