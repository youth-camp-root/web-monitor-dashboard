<template>
  <a-table :columns="columns" :data="data" @change="handleChange">
    <template #type>
      <a-tag color="arcoblue"> {{ $t('user.detail.list.type.event') }} </a-tag>
      <a-tag color="red"> {{ $t('user.detail.list.type.error') }} </a-tag>
    </template>
    <template
      #name-filter="{
        filterValue,
        setFilterValue,
        handleFilterConfirm,
        handleFilterReset,
      }"
    >
      <div class="custom-filter">
        <a-space direction="vertical">
          <a-input
            :model-value="filterValue[0]"
            @input="(value: string) => setFilterValue([value])"
          />
          <div class="custom-filter-footer">
            <a-button @click="handleFilterConfirm">Confirm</a-button>
            <a-button @click="handleFilterReset">Reset</a-button>
          </div>
        </a-space>
      </div>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import { h } from 'vue';
  import { IconSearch } from '@arco-design/web-vue/es/icon';
  import {
    TableChangeExtra,
    TableColumnData,
    TableData,
  } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { userInfoList } from '@/views/user/[id]/mock';

  const { t } = useI18n();

  const columns: TableColumnData[] = [
    {
      title: t('user.detail.list.type'),
      dataIndex: 'type',
      slotName: 'type',
    },
    {
      title: t('user.detail.list.datetime'),
      dataIndex: 'datetime',
      filterable: {
        filter: (value: string[], record: TableData) =>
          record.name.includes(value),
        slotName: 'name-filter',
        icon: () => h(IconSearch),
      },
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sortable: {
        sortDirections: ['ascend'],
      },
    },
  ];
  const data: any = userInfoList;

  const handleChange = (table: TableData[], extra: TableChangeExtra) => {
    console.log('change', table, extra);
  };
</script>

<style scoped lang="less">
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
</style>
