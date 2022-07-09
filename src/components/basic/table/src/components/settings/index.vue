<template>
  <div class="flex gap-1 items-center">
    <RefreshSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <FullScreenSetting v-if="getSetting.fullScreen" />
    <AdvanceFilter v-if="getSetting.advanceFilter" v-bind="getAdvanceFilter" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { isBoolean } from 'lodash-es';
import { FilterProps } from '@/components/basic/filter';
import { TableSetting } from '../../types/table';
import RefreshSetting from './RefreshSetting.vue';
import AdvanceFilter from './AdvanceFilter.vue';

const props = defineProps({
  setting: {
    type: Object as PropType<TableSetting>,
    default: () => ({})
  }
});

const getSetting = computed((): TableSetting => {
  return {
    redo: true,
    size: true,
    fullScreen: true,
    advanceFilter: false,
    ...props.setting
  };
});

const getAdvanceFilter = computed<FilterProps>(() => {
  if (isBoolean(props.setting.advanceFilter) || !props.setting?.advanceFilter) {
    return { items: [] };
  }
  return props.setting.advanceFilter;
});
</script>

<style lang="less" scoped></style>
