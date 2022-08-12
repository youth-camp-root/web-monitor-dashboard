<script setup lang="ts">
  import { ref } from 'vue';
  import ListDetail from './list/list-detail.vue';
  import List from './list/list.vue';

  const size = ref(0.6);
  const item = ref();
  const handleClick = (e: any) => {
    item.value = e;
  };
</script>

<template>
  <div>
    <a-split
      v-model:size="size"
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
