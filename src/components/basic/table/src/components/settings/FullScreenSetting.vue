<template>
  <NTooltip placement="top">
    <template #trigger>
      <Icon
        v-if="!isFullscreen"
        class="text-xl cursor-pointer outline-none"
        icon="ant-design:fullscreen-outlined"
        @click="toggle"
      />
      <Icon
        v-else
        class="text-xl cursor-pointer outline-none"
        icon="ant-design:fullscreen-exit-outlined"
        @click="toggle"
      />
    </template>
    <span>全屏</span>
  </NTooltip>
</template>
<script lang="ts" setup>
import { NTooltip } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { useFullscreen } from '@vueuse/core';
import { useTableContext } from '../../hooks/useTableContext';

const table = useTableContext();
const { toggle, isFullscreen } = useFullscreen(table.wrapRef);
</script>
