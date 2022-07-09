<template>
  <div class="flex items-center gap-5">
    <n-tag type="primary" size="small">1</n-tag>
    <n-select :options="getFieldOptions" />
    <n-select :options="getOperateOptions" />
    <n-input />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { FilterField } from '@/components/basic/filter';

const props = defineProps({
  fields: { type: Array as PropType<FilterField[]>, required: true }
});

const getFieldOptions = computed(() => {
  return props.fields.map(({ label, name }) => {
    return {
      label,
      value: name
    };
  });
});

const getOperateOptions = computed(() => {
  return {};
});
</script>

<style lang="less" scoped></style>
