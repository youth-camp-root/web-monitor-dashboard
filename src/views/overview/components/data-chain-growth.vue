<template>
  <div>
    <a-grid :gutter="16" :cols="{ xs: 1, sm: 2, md: 3 }">
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.retentionTrends')"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-grid-item>
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.userRetention')"
          quota="userRetention"
          chart-type="bar"
        />
      </a-grid-item>
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.contentConsumptionTrends')"
          quota="contentConsumptionTrends"
          chart-type="line"
        />
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
  import ChainItem from './chain-chat.vue';
</script>
