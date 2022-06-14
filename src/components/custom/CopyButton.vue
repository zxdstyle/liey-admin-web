<template>
  <n-tooltip trigger="click">
    <template #trigger>
      <Icon icon="ic:baseline-content-copy" class="inline-block outline-none" @click="handleCopy" />
    </template>
    <span>已复制</span>
  </n-tooltip>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';
import { Icon } from '@iconify/vue';

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});

const { copy, isSupported } = useClipboard();
const handleCopy = async () => {
  if (!isSupported) {
    window.$message?.warning('您的浏览器不支持Clipboard API');
  }
  await copy(props.value);
};
</script>

<style lang="less" scoped></style>
