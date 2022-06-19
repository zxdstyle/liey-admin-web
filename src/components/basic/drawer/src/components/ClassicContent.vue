<template>
  <div class="p-32" :style="getBodyStyle">
    <slot name="header">
      <div class="flex items-center text-zinc-500">
        <Icon
          v-if="closable"
          class="text-zinc-500 mr-6 cursor-pointer hover:text-black"
          icon="mdi:close"
          width="30"
          @click="close"
        />
        <h2 class="text-2xl text-zinc-500">{{ title }}</h2>
      </div>
    </slot>
    <div class="pt-3 pl-13">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { contentProps } from './props';

const props = defineProps({
  // eslint-disable-next-line vue/valid-define-props
  ...contentProps
});
const emit = defineEmits(['close']);

const close = () => emit('close');

const getBodyStyle = computed(() => {
  return {
    ...props.bodyStyle
  };
});
</script>

<style lang="less" scoped></style>
