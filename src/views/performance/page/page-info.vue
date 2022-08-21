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
              <a-grid-item v-for="item in overviewData" :key="item.titleText">
                <Chart
                  :option="createOptions(item)"
                  :style="{ width: 'auto', height: '400px' }"
                  :auto-resize="true"
                >
                </Chart>
              </a-grid-item>
              <a-grid-item>
                <Chart
                  :option="webVitalsOption"
                  :style="{ width: 'auto', height: '400px' }"
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
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryPageInfoOverview } from '@/api/performance';
  import { EChartsOption } from 'echarts';
  import router from '@/router';
  import { useI18n } from 'vue-i18n';
  import RatioLine from './components/ratio-line.vue';

  const { fdURL } = router.currentRoute.value.params;

  const { loading, setLoading } = useLoading();
  const { t } = useI18n();
  const overviewData = ref<any>([]);
  const webVitalData = ref<any>([]);
  const tagsData = ref<any>([]);

  interface CreateOptionsParam {
    titleText: string;
    xData: any;
    contentData: any;
  }

  const createOptions: (param: CreateOptionsParam) => EChartsOption = ({
    titleText,
    xData,
    contentData,
  }) => {
    return {
      title: {
        text: titleText,
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
          data: xData,
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
          data: contentData,
        },
      ],
    };
  };
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
        data: webVitalData,
      },
    ],
  });

  const gotoErrorPage = () => {
    router.push({
      path: '/error',
      query: {
        fdURL,
      },
    });
  };
  function uniqueOfAttr(arr1: any, attr: string) {
    const res = new Map();
    return arr1.filter(
      (item: any) => !res.has(item[attr]) && res.set(item[attr], 1)
    );
  }
  const fetchData = async () => {
    try {
      setLoading(true);
      let tagsTempData: never[] = [];
      overviewData.value = await queryPageInfoOverview(fdURL);
      [webVitalData.value, overviewData.value, tagsTempData] =
        overviewData.value.data;

      ['browser', 'os', 'device'].forEach((name) => {
        tagsData.value.push({
          type: name,
          data: uniqueOfAttr(tagsTempData, name).map((item: any) => {
            return {
              name: item[name],
              value: tagsTempData.filter((tag: any) => tag[name] === item[name])
                .length,
            };
          }),
        });
      });
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
