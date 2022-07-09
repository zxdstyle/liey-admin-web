<template>
  <div>
    <FilterItem :fields="items" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { FilterField } from '@/components/basic/filter';
import FilterItem from './components/FilterItem.vue';

defineProps({
  items: { type: Array as PropType<FilterField[]>, required: true }
});
</script>

<style lang="less" scoped></style>
