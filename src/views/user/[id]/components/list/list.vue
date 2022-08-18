<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { computed, inject, Ref } from 'vue';
  import { IErrorData } from '@/api/errorData';
  import { IRequestData } from '@/api/requestData';
  import { IUserRequest } from '@/api/user';

  const isIErrorData = (x: IErrorData | IRequestData): x is IErrorData => {
    return (x as IErrorData).errorMsg !== undefined;
  };

  const data = inject<Ref<IUserRequest>>('user/[id]/info');
  const other = computed<(IErrorData | IRequestData)[]>(() => {
    return [...(data?.value.errors ?? []), ...(data?.value.events ?? [])].sort(
      (a, b) => {
        return dayjs(a.timestamp.$date).isBefore(dayjs(b.timestamp.$date))
          ? 1
          : -1;
      }
    );
  });

  const emit = defineEmits(['userListClicked']);
  const view = (record: any) => {
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
      :data="other"
      :pagination="false"
      :bordered="false"
    >
      <template #columns>
        <a-table-column
          :title="$t('user.detail.list.type')"
          data-index="number"
        >
          <template #cell="{ record }">
            <a-tag v-if="isIErrorData(record)" color="red">
              {{ $t('user.detail.list.type.error') }}
            </a-tag>
            <a-tag v-else color="arcoblue">
              {{ $t('user.detail.list.type.event') }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('user.detail.list.datetime')"
          data-index="timestamp.$date"
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
        <a-table-column :title="$t('user.detail.list.detail')">
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
