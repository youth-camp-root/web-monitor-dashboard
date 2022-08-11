<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { PolicyRecord } from '@/api/list';

  const { loading, setLoading } = useLoading(false);
  const renderData = ref<PolicyRecord[]>([
    {
      id: '123',
      number: 123,
      name: '123',
      contentType: 'img',
      filterType: 'artificial',
      count: 123,
      status: 'online',
      createdTime: '123',
    },
  ]);
</script>

<template>
  <div class="container">
    <a-table
      row-key="id"
      :scroll="{
        maxHeight: '400px',
      }"
      :loading="loading"
      :data="renderData"
      :pagination="false"
      :bordered="false"
    >
      <template #columns>
        <a-table-column
          :title="$t('user.detail.list.type')"
          data-index="number"
        />
        <a-table-column
          :title="$t('searchTable.columns.contentType')"
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
              {{ $t(`searchTable.form.contentType.${record.contentType}`) }}
            </a-space>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('searchTable.columns.filterType')"
          data-index="filterType"
        >
          <template #cell="{ record }">
            {{ $t(`searchTable.form.filterType.${record.filterType}`) }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('searchTable.columns.status')"
          data-index="status"
        >
          <template #cell="{ record }">
            <span v-if="record.status === 'offline'" class="circle"></span>
            <span v-else class="circle pass"></span>
            {{ $t(`searchTable.form.status.${record.status}`) }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('searchTable.columns.operations')"
          data-index="operations"
        >
          <template #cell>
            <a-button v-permission="['admin']" type="text" size="small">
              {{ $t('searchTable.columns.operations.view') }}
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="less">
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-title {
        margin-left: 16px;
      }
    }
  }
</style>
