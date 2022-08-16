<template>
  <div class="container">
    <!-- <a-space direction="vertical" size="medium"> -->
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
        <a-grid-item v-for="(item, index) in testList" :key="index">
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
      :title="$t('performance.page.card.title.pagelist')"
      :bordered="false"
      class="general-card"
    >
      <a-list hoverable>
        <a-list-item
          v-for="item in pageList"
          :key="item.url"
          @click="gotoPage(`pageinfo/${item.pageid}`, {})"
        >
          {{ item.url }}
        </a-list-item>
      </a-list>
    </a-card>
    <!-- </a-space> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryFPData, PageList, queryPageList } from '@/api/performance';
  import { EChartsOption } from 'echarts';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { setLoading } = useLoading();

  const testList = ref([
    {
      titleText: 'FP',
      xData: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
        '01-08',
        '01-09',
        '01-10',
      ],
      contentData: [100, 200, 130, 240, 330, 220, 230, 200, 160, 200],
    },
    {
      titleText: 'FCP',
      xData: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
        '01-08',
        '01-09',
        '01-10',
      ],
      contentData: [100, 200, 140, 240, 330, 220, 240, 200, 160, 210],
    },
    {
      titleText: 'DOMReady',
      xData: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
        '01-08',
        '01-09',
        '01-10',
      ],
      contentData: [100, 200, 140, 240, 130, 220, 140, 100, 160, 210],
    },
    {
      titleText: 'DNS',
      xData: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
        '01-08',
        '01-09',
        '01-10',
      ],
      contentData: [100, 100, 140, 120, 130, 120, 140, 100, 160, 110],
    },
  ]);

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

  const FCOption = ref({
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
  const pageList = ref<PageList[]>();
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await queryFPData();
      const count = data.map((item) => item.count);
      const value = data.map((item) => item.value);
      // console.log(res);
      FCOption.value.series[0].data = count;
      FCOption.value.xAxis[0].data = value;
      const { data: pageListRes } = await queryPageList();
      pageList.value = pageListRes;
      // console.log(pageList);

      // console.log(data);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const gotoPage = (url: string, params: any) => {
    router.push({
      path: url,
      query: params,
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
