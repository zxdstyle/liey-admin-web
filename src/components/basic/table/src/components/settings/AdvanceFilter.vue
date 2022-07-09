<template>
  <Icon icon="ep:filter" class="text-xl cursor-pointer outline-none" @click="openDrawer" />
  <BasicDrawer @register="register">
    <n-tabs type="line" class="mt-5" size="large" animated>
      <n-tab-pane name="过滤项">
        <template #tab>
          <Icon icon="ep:filter" class="text-xl cursor-pointer outline-none" />
          <span>过滤项</span>
        </template>

        <span class="text-xs opacity-55">设置过滤条件</span>
        <Filter v-bind="getFilterProps" class="mt-2" />
      </n-tab-pane>
      <n-tab-pane name="常用">
        <template #tab>
          <Icon icon="ri:folder-open-line" class="text-xl cursor-pointer outline-none" />
          <span class="ml-1">常&nbsp;用</span>
        </template>
      </n-tab-pane>
    </n-tabs>
  </BasicDrawer>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { Icon } from '@iconify/vue';
import { isBoolean } from 'lodash-es';
import { BasicDrawer, useDrawer } from '@/components/basic/drawer';
import { Filter, FilterField, FilterProps } from '@/components/basic/filter';

const props = defineProps({
  items: { type: [Array, Boolean] as PropType<FilterField[] | Boolean> }
});

const getFilterProps = computed<FilterProps>(() => {
  if (isBoolean(props.items)) {
    return { items: [] };
  }
  return {
    items: props.items as FilterField[]
  };
});

const [register, { openDrawer }] = useDrawer({
  type: 'classic',
  content: { title: '高级搜索', bodyStyle: { padding: '25px' }, bodyContentStyle: { padding: 0 } },
  width: 650
});
</script>
