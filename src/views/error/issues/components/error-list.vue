<template>
  <a-card class="general-card">
    <a-table :data="data" :pagination="pagination">
      <template #columns>
        <a-table-column data-index="type">
          <template #cell="{ record }">
            <a-badge v-if="record.type === 'A'" status="danger" text="A" />
            <a-badge
              v-else-if="record.type === 'B'"
              status="processing"
              text="B"
            />
            <a-badge
              v-else-if="record.type === 'C'"
              status="success"
              text="C"
            />
            <a-badge
              v-else-if="record.type === 'D'"
              status="warning"
              text="D"
            />
          </template>
        </a-table-column>
        <a-table-column data-index="errorName">
          <template #cell="{ record }">
            <div class="column-div">
              <div class="special">
                <span class="special-name" style="color: #3c74dd">
                  {{ record.errorName }}
                </span>
                <span class="special-msg"> {{ record.errorMsg }} </span>
              </div>
              <span class="special-time"> {{ record.errorTime }} </span>
            </div>
          </template>
        </a-table-column>
        <a-table-column data-index="errorFreq">
          <template #cell="{ record }">
            <Chart
              :option="createOptions(record.errorFreq)"
              :width="'160px'"
              :height="'50px'"
              :auto-resize="true"
            >
            </Chart>
          </template>
        </a-table-column>
        <a-table-column
          title="ErrorTotal"
          data-index="errorTotal"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />
        <a-table-column
          title="ErrorPpl"
          data-index="errorPpl"
          :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"
        />
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, h } from 'vue';
  import { Pagination } from '@/types/global';
  import useChartOption from '@/hooks/chart-option';
  import { EChartsOption } from 'echarts';
  import 'echarts/lib/component/markLine';

  const data = reactive([
    {
      errorName: 'AFloatingActor::OnSelected',
      errorMsg: '#0 at 0x7fff204ce462',
      type: 'A',
      errorTime: 'time',
      errorFreq: [10, 20, 21, 7, 3, 10, 2],
      errorTotal: 122,
      errorPpl: 111,
    },
    {
      errorName: 'panic',
      errorMsg: 'called `Result::unwrap()` on an `Err` value: NotPresent',
      type: 'B',
      errorTime: 'time1',
      errorFreq: [6, 4, 3, 7, 3, 10, 17],
      errorTotal: 102,
      errorPpl: 94,
    },
    {
      errorName: 'Handled Exception',
      errorMsg: 'sentry_cocoa.ViewController',
      type: 'C',
      errorTime: 'time2',
      errorFreq: [6, 1, 2, 7, 12, 22, 17],
      errorTotal: 112,
      errorPpl: 87,
    },
    {
      errorName: 'Error',
      errorMsg: 'Unhandled Promise Rejection',
      type: 'D',
      errorTime: 'time3',
      errorFreq: [6, 0, 1, 7, 10, 9, 2],
      errorTotal: 76,
      errorPpl: 43,
    },
    {
      errorName: 'Exception',
      errorMsg: 'Not enough inventory for wrench',
      type: 'A',
      errorTime: 'time4',
      errorFreq: [6, 15, 21, 16, 11, 9, 2],
      errorTotal: 323,
      errorPpl: 256,
    },
  ]);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  interface CreateOptionsParam {
    contentData: number[];
  }

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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
</style>
