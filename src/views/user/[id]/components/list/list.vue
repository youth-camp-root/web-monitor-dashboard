<script lang="ts" setup>
  import { UserEventRecord } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { userInfoList } from '@/views/user/[id]/mock';

  const emit = defineEmits(['userListClicked']);
  const { loading, setLoading } = useLoading(false);
  const renderData = userInfoList;
  const view = (record: UserEventRecord) => {
    emit('userListClicked', record);
  };
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
        >
          <template #cell="{ record }">
            <a-tag :color="record.type === 'error' ? 'red' : 'arcoblue'">{{
              $t(`user.detail.list.type.${record.type}`)
            }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('user.detail.list.datetime')"
          data-index="datetime"
        />
        <a-table-column
          :title="$t('user.detail.list.type')"
          data-index="status"
        >
          <template #cell="{ record }">
            <span v-if="record.error === 'offline'" class="circle"></span>
            <span v-else class="circle pass"></span>
            {{ record.title }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('user.detail.list.detail')"
          data-index="operations"
        >
          <template #cell="{ record }">
            <a-button
              v-permission="['admin']"
              type="text"
              size="small"
              @click="() => view(record)"
            >
              {{ $t('user.detail.list.view') }}
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="less"></style>
