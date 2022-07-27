<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issueDetails']" />
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: 'IssueDetails',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
