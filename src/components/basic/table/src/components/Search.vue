<template>
  <BasicForm v-if="enable" :schemas="schemas" />
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BasicForm, FormSchema } from '@/components/basic/form';

defineProps({
  enable: { type: Boolean },
  schemas: { type: Array as PropType<FormSchema[]>, default: () => [] }
});
</script>

<style lang="less" scoped></style>
