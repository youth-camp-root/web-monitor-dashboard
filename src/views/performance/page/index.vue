<template>
  <a-spin :loading="loading" style="width: 100%">
    <div class="container">
      <Breadcrumb :items="['menu.performance', 'menu.performance.page']" />
      <a-card
        :title="$t('performance.page.card.title.overview')"
        :bordered="false"
        :style="{
          borderRadius: '5px',
          width: '100%',
        }"
        class="general-card"
      >
        <a-grid
          :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }"
          :col-gap="12"
          :row-gap="16"
        >
          <a-grid-item v-for="(item, index) in overviewData" :key="index">
            <Chart
              :option="createOptions(item)"
              :style="{ width: 'auto', height: '300px' }"
              :auto-resize="true"
            >
            </Chart>
          </a-grid-item>
        </a-grid>
      </a-card>
      <a-card
        :title="$t('performance.page.card.title.pagelist')"
        :bordered="false"
        class="general-card"
      >
        <a-list hoverable>
          <a-list-item
            v-for="item in pageData?.pageUrlList"
            :key="item"
            @click="gotoPage('PageInfo', { fdURL: item })"
          >
            {{ item }}
          </a-list-item>
        </a-list>
        <a-space
          fill
          :style="{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
          }"
        >
          <a-pagination
            :total="pageData?.pagesCount"
            @change="changHandle"
          ></a-pagination>
        </a-space>
      </a-card>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryOverviewData, queryPageList } from '@/api/performance';
  import { EChartsOption } from 'echarts';
  import router from '@/router';

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

  //   title: {
  //     text: 'FC',
  //     show: true,
  //     textStyle: {
  //       fontSize: 18,
  //     },
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'cross',
  //       label: {
  //         backgroundColor: '#6a7985',
  //       },
  //     },
  //   },
  //   legend: {
  //     data: ['FP'],
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       data: [] as number[],
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: 'value',
  //     },
  //   ],
  //   series: [
  //     {
  //       name: 'count',
  //       type: 'bar',
  //       data: [] as number[],
  //     },
  //   ],
  // });
  const pageData = ref<any>();
  const overviewData = ref<any>();
  const changHandle = async (newPage: any) => {
    const { data: pageListRes } = await queryPageList({
      page: newPage,
      count: 10,
    });
    pageData.value = pageListRes;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await queryOverviewData();
      overviewData.value = data;

      const { data: pageListRes } = await queryPageList({
        page: 1,
        count: 10,
      });
      pageData.value = pageListRes;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const gotoPage = (urlname: string, params?: any, query?: any) => {
    router.push({
      name: urlname,
      params: {
        fdURL: window.btoa(params.fdURL),
      },
      query,
    });
  };
</script>

<script lang="ts">
  export default {
    name: 'Page',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
