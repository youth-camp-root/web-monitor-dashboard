<template>
  <a-spin :loading="loading" style="width: 100%">
    <div class="container">
      <Breadcrumb :items="['menu.performance', 'menu.performance.api']" />
      <a-card
        :title="$t('performance.api.card.title.overview')"
        :bordered="false"
        :style="{
          borderRadius: '5px',
          width: '100%',
        }"
        class="general-card"
      >
        <a-grid
          :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }"
          :col-gap="12"
          :row-gap="16"
        >
          <a-grid-item v-for="(item, index) in chartsData" :key="index">
            <Chart
              :option="createOptions(item)"
              :width="'auto'"
              :height="'300px'"
              :auto-resize="true"
            >
            </Chart>
          </a-grid-item>
        </a-grid>
      </a-card>
      <a-card
        :title="$t('performance.api.card.title.apilist')"
        :bordered="false"
        class="general-card"
      >
        <a-list hoverable>
          <a-list-item
            v-for="item in apiList"
            :key="item"
            @click="gotoPage('APIInfo', { apiurl: item })"
          >
            {{ item }}
          </a-list-item>
        </a-list>
        <a-pagination :total="apisCount" @change="changHandle"></a-pagination>
      </a-card>
      <!-- </a-space> -->
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryApiOverviewData, queryAPIList } from '@/api/performance';
  import { EChartsOption } from 'echarts';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { loading, setLoading } = useLoading();

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
    // console.log(titleText, xData, contentData);
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
      legend: {
        data: ['FP'],
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
  const Option = ref({
    title: {
      text: 'FC',
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
      data: ['FP'],
    },
    xAxis: [
      {
        type: 'category',
        data: [] as number[],
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
        type: 'bar',
        data: [] as number[],
      },
    ],
  });
  const chartsData = ref<any>([]);
  const apiList = ref([]);
  const apisCount = ref(0);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: overviewData } = await queryApiOverviewData();
      chartsData.value = overviewData;
      const { data: apiListRes } = await queryAPIList({
        count: 10,
        page: 1,
      });
      apiList.value = apiListRes.apiList;
      apisCount.value = apiListRes.apisCount;
      // console.log(data);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  const changHandle = async (newPage: any) => {
    const { data: apiListRes } = await queryAPIList({
      count: 10,
      page: newPage,
    });
    apiList.value = apiListRes.apiList;
    apisCount.value = apiListRes.count;
  };
  const gotoPage = (urlname: string, params?: any, query?: any) => {
    router.push({
      name: urlname,
      params: {
        apiurl: window.btoa(params.apiurl),
      },
      query,
    });
  };
</script>

<script lang="ts">
  export default {
    name: 'API',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
