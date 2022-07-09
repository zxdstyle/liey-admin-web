<template>
  <NTooltip placement="top">
    <template #trigger>
      <Icon class="outline-none cursor-pointer text-xl" icon="uis:redo" @click="redo" />
    </template>
    <span>刷新</span>
  </NTooltip>
</template>
<script lang="ts" setup>
import { NTooltip } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { useTableContext } from '../../hooks/useTableContext';

const table = useTableContext();
function redo() {
  table.reload();
}
</script>
