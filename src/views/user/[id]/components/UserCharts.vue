<template>
  <a-grid
    :cols="{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }"
    :col-gap="16"
    :row-gap="12"
    class="grid"
  >
    <a-grid-item class="items"><PageChartVue /></a-grid-item>
    <a-grid-item class="items"><RequestChartVue /></a-grid-item>
    <a-grid-item class="items"><VisitChartVue /></a-grid-item>
  </a-grid>
</template>

<script setup lang="ts">
  import PageChartVue from './charts/PageChart.vue';
  import VisitChartVue from './charts/VisitChart.vue';
  import RequestChartVue from './charts/RequestChart.vue';
</script>

<style scoped lang="less">
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--primary-6));
    aspect-ratio: 1;
    @media (min-width: 300px) {
      height: 200px;
      aspect-ratio: inherit;
    }
  }
</style>
