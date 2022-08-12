<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.retentionTrends')"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="8">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.userRetention')"
          quota="userRetention"
          chart-type="bar"
        />
      </a-col>
      <a-col :span="8">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.contentConsumptionTrends')"
          quota="contentConsumptionTrends"
          chart-type="line"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import ChainItem from './chain-chat.vue';
</script>
