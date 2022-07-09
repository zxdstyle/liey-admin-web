<template>
  <div class="w-full mb-2">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop"></slot>
    </div>
    <div class="flex items-center justify-between">
      <slot v-if="$slots.tableTitle" name="tableTitle"></slot>
      <div v-if="!$slots.tableTitle && title" class="flex items-center">
        <h3>
          <span class="text-lg">{{ title }}</span>
          <span v-if="descriptionRenderType === 'text'" class="ml-1 text-xs opacity-55">{{ description }}</span>
        </h3>

        <n-tooltip v-if="description && descriptionRenderType === 'tooltip'">
          <template #trigger><Icon icon="clarity:help-line" class="ml-1 text-lg" /></template>
          {{ description }}
        </n-tooltip>
      </div>
      <div>
        <slot name="toolbar"></slot>
        <NDivider v-if="$slots.toolbar && showTableSetting" type="vertical" />
        <TableSettingComponent v-if="showTableSetting" :setting="tableSetting" @columns-change="handleColumnChange" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
import { NDivider } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { ColumnChangeParam, TableSetting } from '../types/table';
import TableSettingComponent from './settings/index.vue';

defineProps({
  title: {
    type: [Function, String] as PropType<string | ((data: Recordable) => string)>
  },
  description: {
    type: String as PropType<string>,
    default: ''
  },
  descriptionRenderType: {
    type: String as PropType<'text' | 'tooltip'>,
    default: 'text'
  },
  tableSetting: {
    type: Object as PropType<TableSetting>
  },
  showTableSetting: {
    type: Boolean
  }
});

const emit = defineEmits(['columns-change']);

function handleColumnChange(data: ColumnChangeParam[]) {
  emit('columns-change', data);
}
</script>
