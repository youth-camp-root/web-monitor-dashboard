<template>
  <a-card class="general-card" :title="$t('issuses.card.title.errorlist')">
    <div class="form">
      <div class="form-item">
        <span>Error Type </span>
        <a-select
          :style="{ width: '380px', height: '32px' }"
          placeholder="Please select ..."
          multiple
          allow-clear
          :max-tag-count="2"
        >
          <a-option>JS Error</a-option>
          <a-option>Promise Error</a-option>
          <a-option>Resource Error</a-option>
          <a-option>Request Error</a-option>
          <a-option>Blank Screen Error</a-option>
        </a-select>
      </div>
      <div class="form-item">
        <span> Website </span>
        <a-input
          :style="{ width: '420px', height: '32px' }"
          placeholder="Please enter ..."
          allow-clear
        >
        </a-input>
      </div>
    </div>
    <a-divider />
    <a-table
      :loading="loading"
      :pagination="pagination"
      :data="renderData"
      :bordered="false"
      @page-change="onPageChange"
    >
      <template #columns>
        <a-table-column data-index="type">
          <template #cell="{ record }">
            <a-badge v-if="record.errorType === 'jsError'" status="danger" />
            <a-badge
              v-else-if="record.errorType === 'promiseError'"
              status="processing"
            />
            <a-badge
              v-else-if="record.errorType === 'resourceError'"
              status="success"
            />
            <a-badge
              v-else-if="record.errorType === 'requestError'"
              status="warning"
            />
            <a-badge
              v-else-if="record.errorType === 'blankscreenError'"
              status="normal"
            />
          </template>
        </a-table-column>
        <a-table-column data-index="errorName" fixed="left">
          <template #cell="{ record }">
            <div class="column-div">
              <div class="special">
                <span class="special-name" style="color: #3c74dd">
                  {{ record.name }}
                </span>
                <span class="special-msg"> {{ record.errorMsg }} </span>
              </div>
              <span class="special-time"> {{ record.timestamp }} </span>
              <span class="special-time"> {{ record.originURL }} </span>
            </div>
          </template>
        </a-table-column>
        <a-table-column data-index="errorFreq">
          <template #cell="{ record }">
            <Chart
              :option="createOptions(record.errorFreq)"
              :width="'220px'"
              :height="'50px'"
              :auto-resize="true"
            >
            </Chart>
          </template>
        </a-table-column>
        <a-table-column
          title="TotalErrCnt"
          data-index="TotalErrCnt"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />
        <a-table-column
          title="userAffectCnt"
          data-index="userAffectCnt"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />
        <a-table-column fixed="right">
          <template #cell="{ record }">
            <a-button @click="issuesDetail(record.errorID)">view</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import { EChartsOption } from 'echarts';
  import 'echarts/lib/component/markLine';
  import router from '@/router';
  import useLoading from '@/hooks/loading';
  import { queryErrorList, ErrorListParams, ErrorList } from '@/api/errorData';

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<ErrorList[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const xAxis = ref<string[]>([]);

  const issuesDetail = (issueid: number) => {
    console.log(issueid);
    router.push({ name: 'IssueDetails', params: { issueid } });
  };

  const fetchData = async (
    params: ErrorListParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryErrorList(params);
      xAxis.value = data.xAxis;
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();

  const createOptions = (param: number[]): EChartsOption => {
    console.log(param);
    return {
      color: ['#6aa1ff'],
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: '12',
        },
      },
      grid: {
        left: 30,
        right: 0,
        top: 15,
        bottom: 0,
      },
      xAxis: [
        {
          show: false,
          type: 'category',
          splitLine: {
            show: false,
          },
          data: xAxis.value,
        },
      ],
      yAxis: [
        {
          show: false,
          type: 'value',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'count',
          type: 'bar',
          data: param,
          markLine: {
            symbol: 'none',
            data: [{ type: 'max', name: 'Max' }],
            emphasis: {
              lineStyle: {
                width: 1, // hover时的折线宽度
              },
            },
            tooltip: {
              show: false,
            },
            label: {
              fontSize: '10',
              position: 'start',
            },
            lineStyle: {
              color: '#86909c',
            },
          },
        },
      ],
    };
  };
</script>

<style>
  .general-card {
    display: flex;
    flex-direction: column;
    min-width: 680px;
    padding: 10px 0 0 0;
    border-radius: 5px;
  }

  .custom-filter {
    padding: 20px;
    background: var(--color-bg-5);
    border: 1px solid var(--color-neutral-3);
    border-radius: var(--border-radius-medium);
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
  }

  .custom-filter-footer {
    display: flex;
    justify-content: space-between;
  }

  .special {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .special span {
    margin: 0 5px;
    overflow: hidden;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .special .special-msg {
    color: var(--color-neutral-8);
    font-size: 14px;
  }

  .special-time {
    margin: 0 5px;
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .form-item {
    margin-top: 10px;
    margin-left: 20px;
  }
</style>
