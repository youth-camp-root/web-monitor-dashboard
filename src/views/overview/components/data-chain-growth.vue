<template>
  <div>
    <a-grid :gutter="16" :cols="{ xs: 1, sm: 2, md: 3 }">
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.PV')"
          quota="PVTrends"
          chart-type="line"
        />
      </a-grid-item>
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.UV')"
          quota="UVTrends"
          chart-type="line"
        />
      </a-grid-item>
      <a-grid-item>
        <ChainItem
          :title="$t('multiDAnalysis.card.title.UserRetentionAverageTime')"
          quota="UserRetentionAverageTime"
          chart-type="bar"
        />
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
  import ChainItem from './chain-chat.vue';
</script>
