<script setup lang="ts">
  import { UserEventRecord } from '@/api/user';
  import { computed, PropType } from 'vue';

  const props = defineProps({
    item: Object as PropType<UserEventRecord>,
  });

  const data = computed(() => {
    return Object.entries(props.item ?? {}).map(([key, value]) => {
      return {
        label: key,
        value,
      };
    });
  });
</script>

<template>
  <a-card>
    <a-descriptions
      style="margin-top: 20px"
      :data="data"
      size="small"
      title="User Info"
      :column="1"
    />
  </a-card>
</template>
