<template>
  <div class="container">
    <Breadcrumb :items="['menu.error', 'menu.error.issues']" />
    <ErrorOverview></ErrorOverview>
    <ErrorList></ErrorList>
  </div>
</template>

<script lang="ts" setup>
  import errorList from './components/error-list.vue';
  import errorOverview from './components/error-overview.vue';
  import ErrorList from './components/error-list.vue';
  import ErrorOverview from './components/error-overview.vue';
</script>

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
