<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issueDetails']" />
    <div class="overview-box">
      <a-row class="PannelContainer">
        <a-row class="grid-row">
          <a-col class="grid-col">
            <div class="issue-overview">
              <a-typography-text bold style="font-size: 18px; color: blue">
                {{ data.name ? data.name : 'typeerror' }}
              </a-typography-text>
              <a-typography-text code>
                {{
                  data.info && data.info.originURL
                    ? data.info.originURL
                    : 'www.baidu.com'
                }}
              </a-typography-text>
              <div class="issue-timeShow">
                <a-tag checkable color="red" :default-checked="true"
                  >时间</a-tag
                >
                <a-typography-text>
                  {{
                    data.info && data.info.timestamp.$date
                      ? data.info.timestamp.$date
                      : '2022-8-20'
                  }}
                </a-typography-text>
              </div>
            </div>
          </a-col>
        </a-row>
        <div class="grid-row">
          <a-col class="grid-col" :span="8">
            <a-statistic
              :title="$t('error.issueDetails.errTotalNum')"
              :value="
                data.details && data.details.TotalErrCnt
                  ? data.details.TotalErrCnt
                  : 0
              "
              :value-from="0"
              animation
              show-group-separator
            >
            </a-statistic>
          </a-col>
          <a-col grid-col>
            <a-statistic
              :title="$t('error.issueDetails.affectNum')"
              :value="
                data.details && data.details.userAffectCnt
                  ? data.details.userAffectCnt
                  : 0
              "
              :value-from="0"
              animation
              show-group-separator
            >
            </a-statistic>
          </a-col>
        </div>
        <div class="chartPannel">
          <Vcharts
            :options="{
              title: { text: '错误次数统计表' },
              tooltip: {},
              xAxis: {
                data: [
                  '2022-8-6',
                  '2022-8-7',
                  '2022-8-8',
                  '2022-8-9',
                  '2022-8-10',
                  '2022-8-11',
                  '2022-8-12',
                  '2022-8-13',
                  '2022-8-14',
                  '2022-8-15',
                  '2022-8-16',
                  '2022-8-17',
                  '2022-8-18',
                  '2022-8-19',
                ],
              },
              yAxis: {},
              series: [
                {
                  name: '错误次数',
                  type: 'bar',
                  data:
                    data.details && data.details.errorFreq
                      ? data.details.errorFreq
                      : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
              ],
            }"
            :height="'300px'"
          ></Vcharts>
        </div>
      </a-row>
    </div>
    <!-- userMessage -->
    <div class="userContainer">
      <div class="device">
        <div class="deviceItem">
          <icon-user :size="54" />
          <p class="deviceItemText">{{
            data.user && data.user.user._id.$oid
              ? data.user.user._id.$oid
              : '156141dasdasd'
          }}</p>
        </div>
        <div class="deviceItem">
          <icon-printer :size="54" />
          <p class="deviceItemText">{{
            data.user && data.user.user.device ? data.user.user.device : 'apple'
          }}</p>
        </div>
        <div class="deviceItem">
          <icon-computer :size="54" />
          <p class="deviceItemText">{{
            data.user && data.user.user.os ? data.user.user.os : 'windows'
          }}</p>
        </div>
      </div>
      <div class="detail">
        <h3>TAGS</h3>
        <a-space class="detailDetailCards">
          <!-- <card class="detailDetailCard">
            <a-tag checkable>版本号:</a-tag>
            <a-tag checkable color="arcoblue" :default-checked="true">{{
              deviceDetail.version
            }}</a-tag>
          </card> -->
          <!-- <card class="detailDetailCard">
            <a-tag checkable>内置ID:</a-tag>
            <a-tag checkable color="arcoblue" :default-checked="true">{{
              deviceDetail.innerId
            }}</a-tag>
          </card> -->
          <card class="detailDetailCard">
            <a-tag checkable>IP地址:</a-tag>
            <a-tag checkable color="arcoblue" :default-checked="true">{{
              data.user && data.user.user.ip ? data.user.user.ip : '192.168.1.1'
            }}</a-tag>
          </card>
          <card class="detailDetailCard">
            <a-tag checkable>设备:</a-tag>
            <a-tag checkable color="arcoblue" :default-checked="true">{{
              data.user && data.user.user.device
                ? data.user.user.device
                : 'chrome'
            }}</a-tag>
          </card>
          <card class="detailDetailCard">
            <a-tag checkable>页面地址:</a-tag>
            <a-tag checkable color="arcoblue" :default-checked="true">{{
              data.user && data.user.user.page
                ? data.user.user.page
                : 'www.sdasdas.com'
            }}</a-tag>
          </card>
        </a-space>
        <h3>UserAgent</h3>
        {{ data.user && data.user.user.browser ? data.user.user.browser : '' }}
      </div>
    </div>
    <!--  -->
    <div class="main-box">
      <div class="details">
        <!-- stack -->
        <a-spin style="width: 100%">
          <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
          >
            <template #title>
              {{ $t('error.issueDetails.stackInfo') }}
            </template>
            <a-space direction="vertical" :size="10" fill>
              <a-menu>
                <a-sub-menu v-for="record in recordList" :key="record.key">
                  <template #title>{{ record.title }}</template>
                  <a-menu-item key="record_address">{{
                    record.address
                  }}</a-menu-item>
                  <a-menu-item key="record_button"
                    >【源码解析位置】:
                    <a-button
                      style="margin-left: 10px"
                      type="primary"
                      shape="round"
                      size="mini"
                      status="warning"
                      >解析源码</a-button
                    >
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </a-space>
          </a-card>
        </a-spin>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import useRequest from '@/hooks/request';
  import { ErrorDetailData, queryErrorIssue } from '@/api/errorData';
  import Vcharts from '@/components/chart/index.vue';

  const route = useRoute();
  const issueid = route.params.issueid as string;
  const { response: data } = useRequest<ErrorDetailData>(() =>
    queryErrorIssue(issueid)
  );
  // data-pannel

  //  stack
  const recordList = [
    {
      key: '1',
      title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72045',
      increases: 35,
      address:
        '【压缩代码位置】：rror):t(o?o(e.data):e.data)}),n++,i();else{var s=【错误位置：】i();t(o?o(s):s)}})}}var r=t;this.displayImageCho',
    },
    {
      key: '2',
      title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72310',
      increases: 35,
      address:
        '【压缩代码位置】：rror):t(o?o(e.data):e.data)}),n++,i();else{var s=【错误位置：】i();t(o?o(s):s)}})}}var r=t;this.displayImageCho',
    },
    {
      key: '3',
      title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:72198',
      increases: 35,
      address:
        '【压缩代码位置】：rror):t(o?o(e.data):e.data)}),n++,i();else{var s=【错误位置：】i();t(o?o(s):s)}})}}var r=t;this.displayImageCho',
    },
    {
      key: '4',
      title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:75766',
      increases: 35,
      address:
        '【压缩代码位置】：rror):t(o?o(e.data):e.data)}),n++,i();else{var s=【错误位置：】i();t(o?o(s):s)}})}}var r=t;this.displayImageCho',
    },
    {
      key: '5',
      title: 'https://www.test.com/webfunny/common.e6d84b9c.js:29:69967',
      increases: 35,
      address:
        '【压缩代码位置】：rror):t(o?o(e.data):e.data)}),n++,i();else{var s=【错误位置：】i();t(o?o(s):s)}})}}var r=t;this.displayImageCho',
    },
  ];
</script>

<script lang="ts">
  export default {
    name: 'IssueDetails',
  };
</script>

<style scoped lang="less">
  .issue-timeShow {
    margin-top: 20px;
    margin-left: 20px;
    text-align: left;
  }
  // echarts
  .chartPannel {
    width: 60%;
  }
  // dataPannel---------------------------
  .PannelContainer {
    padding: 20px;
  }
  .grid-row {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
  .grid-col {
    width: 40%;
    margin-left: 20px;
  }
  // dataPannel---------------------------
  // userMessage---------------------------
  .userContainer {
    width: 100%;
    height: 60%;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-2);
  }
  /* device--------------- */
  .userContainer .device .deviceItem {
    float: left;
    margin-right: 10%;
    width: 10%;
    text-align: center;
  }

  .userContainer .device .deviceItem .deviceItemText {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  /* detail */
  .detailDetailCards {
    display: flex;
    flex-wrap: wrap;
  }
  // userMessage---------------------

  .container {
    padding: 16px 20px;
    padding-bottom: 0;
  }

  .overview-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }

  .main-box {
    display: flex;
    min-height: auto;
  }

  .details {
    width: 100%;
  }
  // stack
  .general-card {
    min-height: 395px;
  }

  :deep(.arco-table-tr) {
    height: 44px;

    .arco-typography {
      margin-bottom: 0;
    }
  }

  .increases-cell {
    display: flex;
    align-items: center;

    span {
      margin-right: 4px;
    }
  }
</style>
