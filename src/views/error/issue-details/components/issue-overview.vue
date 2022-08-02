<template>
  <a-col class="issue-overview">
    <a-col :span="8">
      <a-typography-title :heading="4" style="margin-top: 0">
        {{ issueInfo.name }}
      </a-typography-title>
      <a-typography-text code>
        {{ issueInfo.from }}
      </a-typography-text>
    </a-col>
  </a-col>
</template>

<script lang="ts" setup>
  interface IIssueInfo {
    name: string;
    from: string;
  }
  const issueInfo: IIssueInfo = {
    name: 'TypeError',
    from: 'call(components/App)',
  };
</script>

<style scoped lang="less">
  .issue-overview {
    width: 30%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }
</style>
