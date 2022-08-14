<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.overview']" />
    <a-space direction="vertical" :size="12" fill>
      <a-space direction="vertical" :size="16" fill>
        <div class="space-unit">
          <PublicOpinion />
        </div>
        <div>
          <a-grid :cols="24" :col-gap="16" :row-gap="16">
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
            >
              <ContentPublishRatio />
            </a-grid-item>
          </a-grid>
        </div>
        <div>
          <DataChainGrowth />
        </div>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import DataChainGrowth from './components/data-chain-growth.vue';
  import PublicOpinion from './components/public-opinion.vue';
  import ContentPublishRatio from './components/content-publish-ratio.vue';
</script>

<script lang="ts">
  export default {
    name: 'Overview',
  };
</script>

<style scoped lang="less">
  .container {
    margin-bottom: 20px;
    padding: 0 20px 20px 20px;
  }

  .space-unit {
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  .title-fix {
    margin: 0 0 12px 0;
    font-size: 14;
  }

  :deep(.section-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
</style>
