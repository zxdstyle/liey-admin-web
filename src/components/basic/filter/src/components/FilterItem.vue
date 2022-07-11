<template>
  <div class="flex items-center gap-5 animate-fade-in grid grid-cols-24">
    <n-grid :cols="24" x-gap="5">
      <n-grid-item span="8" class="flex items-center gap-2">
        <n-tag type="primary" size="small">{{ index + 1 }}</n-tag>
        <n-select v-model:value="getField" :options="getFieldOptions" />
      </n-grid-item>
      <n-grid-item span="5">
        <n-select v-model:value="getOperate" :options="operateOptions" />
      </n-grid-item>
      <n-grid-item span="10" class="flex items-center gap-2">
        <FilterValue v-model:value="getValue" class="w-full" v-bind="getFilterValue" />
        <BasicButton icon="ion:trash-outline" text type="error" :icon-size="22" @click="onDelete" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch } from 'vue';
import { SelectOption } from 'naive-ui';
import { FilterField, operateMap, OperateType } from '@/components/basic/filter';
import FilterValue from './FilterValue.vue';

const props = defineProps({
  fields: { type: Object as PropType<Map<string, FilterField>>, required: true },
  index: { type: Number, required: true },
  field: { type: String },
  operate: { type: String },
  value: { type: [String, Number, Array] }
});

const emit = defineEmits(['update:field', 'update:operate', 'update:value', 'delete']);

const getFieldOptions = computed(() => {
  const fields: SelectOption[] = [];
  props.fields.forEach(({ label, name }) => {
    fields.push({
      label,
      value: name
    });
  });
  return fields;
});

const getOperate = computed({
  get: () => props.operate,
  set: val => emit('update:operate', val)
});

const getField = computed({
  get: () => props.field,
  set: val => {
    if (!val) return;
    emit('update:field', val);

    const field = props.fields.get(val);
    if (!field || (getOperate.value && field.operates.indexOf(getOperate.value as OperateType) === -1)) {
      emit('update:operate', null);
    }
  }
});

const getValue = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
});

const getFilterValue = computed(() => {
  if (!getField.value) return { field: undefined };

  return {
    field: props.fields.get(getField.value)
  };
});

const operateOptions = ref<SelectOption[]>([]);
watch(
  getField,
  value => {
    if (!value) return;
    const { operates } = props.fields.get(value) as FilterField;
    const options: SelectOption[] = [];
    operates.forEach((operate: OperateType) => {
      const opt = operateMap.get(operate);
      if (opt) options.push({ value: opt.key, label: opt.label });
    });
    operateOptions.value = options;
  },
  { deep: true, immediate: true }
);

const onDelete = () => emit('delete', props.index);
</script>
