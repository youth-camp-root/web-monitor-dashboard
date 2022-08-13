<template>
  <div class="container">
    <Breadcrumb :items="['menu.general', 'menu.useraction']" />
    <a-card class="general-card" :title="$t('menu.useraction')">
      <a-row justify="center">
        <a-col :span="12" style="height: '60px'">
          <a-input
            v-model="formModel.number"
            :placeholder="$t('useraction.form.number.placeholder')"
          />
        </a-col>
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('useraction.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 20px" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('useraction.columns.number')"
            data-index="number"
          />
          <a-table-column
            :title="$t('useraction.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('useraction.columns.contentType')"
            data-index="contentType"
          >
            <template #cell="{ record }">
              <a-space>
                <a-avatar
                  v-if="record.contentType === 'img'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar
                  v-else-if="record.contentType === 'horizontalVideo'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar v-else :size="16" shape="square">
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                {{ $t(`useraction.form.contentType.${record.contentType}`) }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('useraction.columns.filterType')"
            data-index="filterType"
          >
            <template #cell="{ record }">
              {{ $t(`useraction.form.filterType.${record.filterType}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('useraction.columns.count')"
            data-index="count"
          />
          <a-table-column
            :title="$t('useraction.columns.createdTime')"
            data-index="createdTime"
          />
          <a-table-column
            :title="$t('useraction.columns.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ $t(`useraction.form.status.${record.status}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('useraction.columns.operations')"
            data-index="operations"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['admin']"
                type="text"
                size="small"
                @click="jumpTo(record.number)"
              >
                {{ $t('useraction.columns.operations.view') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  // import { computed, ref, reactive } from 'vue';
  import { ref, reactive } from 'vue';
  // import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import {
    queryPolicyList,
    PolicyRecord,
    PolicyParams,
    PolicyParamsUserAction,
    queryUserList,
  } from '@/api/list';
  import { Pagination } from '@/types/global';
  // import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const router = useRouter();
  const { loading, setLoading } = useLoading(true);
  // const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const fetchData1 = async (
    params: PolicyParamsUserAction = {
      id: formModel.value.number,
      current: 1,
      pageSize: 20,
    }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryUserList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const jumpTo = (id: number) => {
    // eslint-disable-next-line no-console
    // const tempId: string = parseInt(number, 10);
    router.push(`/user/${id}`);
  };
  const search = () => {
    if (formModel.value.number) {
      fetchData1({
        ...basePagination,
        ...formModel.value,
      } as unknown as PolicyParamsUserAction);
    } else {
      Message.info('请输入用户编号');
    }
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
    fetchData({ ...basePagination });
  };
</script>

<script lang="ts">
  export default {
    name: 'UserAction',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
