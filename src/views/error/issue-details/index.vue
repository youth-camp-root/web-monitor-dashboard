<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issueDetails']" />
    <div class="overview-box">
      <DataPanel></DataPanel>
    </div>
    <userMessage></userMessage>
    <div class="main-box">
      <div class="details">
        <StackInfo></StackInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DataPanel from './components/data-panel.vue';
  import StackInfo from './components/stack-info.vue';
  import userMessage from './components/issue-userMessage.vue';
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
  }

  .overview-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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
    width: 100%;
  }
</style>
