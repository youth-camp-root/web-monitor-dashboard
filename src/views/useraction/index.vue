<template>
  <div class="container">
    <Breadcrumb :items="['menu.general', 'menu.useraction']" />
    <a-card class="general-card" :title="$t('menu.useraction')">
      <a-row justify="center">
        <a-col :span="12" style="height: '60px'">
          <a-input
            v-model="idInput"
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
              {{ $t('useraction.form.reset') }}
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
        :scroll="scrollPercent"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('useraction.columns.number')"
            :table-layout-fixed="true"
            data-index="number"
            fixed="left"
          />
          <a-table-column
            :title="$t('useraction.columns.contentType')"
            data-index="contentType"
            :ellipsis="true"
          />
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
            :title="$t('useraction.columns.operations')"
            data-index="operations"
            fixed="right"
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
  import { ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { Pagination } from '@/types/global';
  import { queryUserList, queryUserListId } from '@/api/user-action';
  import { UserInfo } from '@/api/user';

  const router = useRouter();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<UserInfo[]>([]);
  const idInput = ref('');
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const scrollPercent = {
    x: '120%',
    y: '100%',
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (
    pagParam: Pagination = basePagination,
    id?: string
  ) => {
    setLoading(true);
    try {
      const { data } =
        id === undefined
          ? await queryUserList(pagParam)
          : await queryUserListId(pagParam, id);
      renderData.value = data.list;
      pagination.current = pagParam.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const jumpTo = (id: number) => {
    router.push(`/user/${id}`);
  };
  const search = () => {
    if (idInput.value) {
      fetchData(basePagination, idInput.value);
    } else {
      Message.warning('请输入用户编号');
    }
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    idInput.value = '';
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
