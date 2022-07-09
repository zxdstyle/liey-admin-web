<template>
  <NTooltip placement="top">
    <template #trigger>
      <div>
        <NDropdown trigger="click" :options="options" @select="handleTitleClick">
          <Icon icon="ant-design:column-height-outlined" class="outline-none cursor-pointer text-xl" />
        </NDropdown>
      </div>

      <!--      <Icon icon="ant-design:column-height-outlined" class="outline-none cursor-pointer text-xl" />-->
    </template>

    <span>密度</span>
  </NTooltip>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { NTooltip, NDropdown } from 'naive-ui';
import { Icon } from '@iconify/vue';
import type { SizeType } from '../../types/table';
import { useTableContext } from '../../hooks/useTableContext';

const table = useTableContext();

function handleTitleClick(key: SizeType) {
  table.setProps({
    size: key
  });
}

const options = computed(() => {
  const size = table.getSize();
  return [
    { label: '紧凑', key: 'small', disabled: false },
    { label: '中等', key: 'medium', disabled: false },
    { label: '默认', key: 'large', disabled: false }
  ].map(item => {
    if (item.key === size) {
      item.disabled = true;
    }
    return item;
  });
});
</script>
