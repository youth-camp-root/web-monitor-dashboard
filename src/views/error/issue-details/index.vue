<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issueDetails']" />
    <div class="overview-box">
      <div class="panel">
        <DataPanel></DataPanel>
      </div>
    </div>
    <div class="main-box">
      <div class="details">
        <StackInfo></StackInfo>
      </div>
      <div class="statistics"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DataPanel from './components/data-panel.vue';
  import StackInfo from './components/stack-info.vue';
</script>

<script lang="ts">
  export default {
    name: 'IssueDetails',
  };
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    padding-bottom: 0;
    overflow: auto;
    background-color: var(--color-fill-2);
  }

  .overview-box {
    flex: 1;
    margin-bottom: 10px;
  }

  .panel {
    overflow: auto;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }

  .main-box {
    display: flex;
    min-height: auto;
  }

  .details {
    flex: 2;
  }

  .statistics {
    flex: 1;
  }
</style>
