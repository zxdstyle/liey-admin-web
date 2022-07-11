<template>
  <NButton v-bind="getBindValue" @click="onClick">
    <slot></slot>
    <template #icon>
      <Icon v-if="icon" :icon="icon" :style="{ fontSize: iconSize + 'px' }" />
    </template>
  </NButton>
</template>

<script lang="ts" setup>
import { computed, PropType, unref, useAttrs } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

const props = defineProps({
  color: { type: String },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  /**
   * Text before icon.
   */
  icon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args: any) => any>, default: null }
});

const attrs = useAttrs();

const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>

<style lang="less" scoped></style>
