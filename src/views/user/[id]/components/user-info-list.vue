<script setup lang="ts">
  import { IErrorData } from '@/api/errorData';
  import { IRequestData } from '@/api/requestData';
  import { debounce } from 'lodash';
  import { onMounted, onUnmounted, ref } from 'vue';
  import ListDetail from './list/list-detail.vue';
  import List from './list/list.vue';

  const size = ref(0.6);
  const item = ref();
  const handleClick = (e: IRequestData | IErrorData) => {
    item.value = e;
  };

  const direction = ref<'vertical' | 'horizontal'>(
    window.innerWidth > 768 ? 'horizontal' : 'vertical'
  );

  const onResize = debounce(() => {
    direction.value = window.innerWidth > 768 ? 'horizontal' : 'vertical';
  }, 10);

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
</script>

<template>
  <div>
    <a-split
      v-model:size="size"
      :direction="direction"
      :style="{
        height: '400px',
        width: '100%',
        minWidth: '500',
      }"
      min="300"
    >
      <template #first>
        <list @user-list-clicked="handleClick" />
      </template>
      <template #resize-trigger> &nbsp; </template>
      <template #second>
        <list-detail :item="item" />
      </template>
    </a-split>
  </div>
</template>

<style lang="less">
  .arco-split-pane.arco-split-pane-first::-webkit-scrollbar {
    display: none;
  }
</style>
