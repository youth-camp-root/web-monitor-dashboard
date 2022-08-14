<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<script lang="ts" setup>
  // https://github.com/ecomfe/vue-echarts/issues/104
  // vue-echarts :auto-resize="autoResize" not working
  // The attribute had changed to autoresize instead of auto-resize
  import { ref, nextTick } from 'vue';
  import VCharts from 'vue-echarts';
  // import { useAppStore } from '@/store';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart } from 'echarts/charts';
  import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
  } from 'echarts/components';

  use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
  ]);

  defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  });
  // const appStore = useAppStore();
  // const theme = computed(() => {
  //   if (appStore.theme === 'dark') return 'dark';
  //   return '';
  // });
  const renderChart = ref(false);
  // wait container expand
  nextTick(() => {
    renderChart.value = true;
  });
</script>

<style scoped lang="less"></style>
