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
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
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
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
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
  // const contentTypeOptions = computed<SelectOptionData[]>(() => [
  //   {
  //     label: t('useraction.form.contentType.img'),
  //     value: 'img',
  //   },
  //   {
  //     label: t('useraction.form.contentType.horizontalVideo'),
  //     value: 'horizontalVideo',
  //   },
  //   {
  //     label: t('useraction.form.contentType.verticalVideo'),
  //     value: 'verticalVideo',
  //   },
  // ]);
  // const filterTypeOptions = computed<SelectOptionData[]>(() => [
  //   {
  //     label: t('useraction.form.filterType.artificial'),
  //     value: 'artificial',
  //   },
  //   {
  //     label: t('useraction.form.filterType.rules'),
  //     value: 'rules',
  //   },
  // ]);
  // const statusOptions = computed<SelectOptionData[]>(() => [
  //   {
  //     label: t('useraction.form.status.online'),
  //     value: 'online',
  //   },
  //   {
  //     label: t('useraction.form.status.offline'),
  //     value: 'offline',
  //   },
  // ]);
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

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  // const reset = () => {
  //   formModel.value = generateFormModel();
  // };
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
