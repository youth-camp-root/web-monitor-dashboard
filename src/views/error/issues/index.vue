<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issues']" />
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: 'Issues',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
