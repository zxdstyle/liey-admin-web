<template>
  <div>
    <div>
      <FilterItem
        v-for="(_, index) in conditions"
        :key="index"
        v-model:field="conditions[index].field"
        v-model:operate="conditions[index].operate"
        v-model:value="conditions[index].value"
        :index="index"
        :fields="getFields"
        class="mb-3"
        @delete="onDeleteItem"
      />

      <div class="text-xs text-red-500 ml-1 h-18px">
        <div v-if="showTip" class="flex items-center animate-fade-in">
          <Icon icon="carbon:help" class="text-lg mr-1" />
          <span>至少需要一个过滤项</span>
        </div>
      </div>
    </div>
    <BasicButton icon="material-symbols:add" :icon-size="20" type="primary" quaternary @click="onAddItem"
      >增加过滤项</BasicButton
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Condition, FilterField } from './typing';
import FilterItem from './components/FilterItem.vue';

const props = defineProps({
  items: { type: Array as PropType<FilterField[]>, required: true }
});

const getFields = computed(() => {
  const fields = new Map<string, FilterField>();
  props.items.forEach(item => {
    fields.set(item.name, item);
  });
  return fields;
});

const conditions = ref<Condition[]>([]);

const addItem = (index: number) => {
  const item = props.items[index];

  conditions.value.push({ field: item.name, operate: item.operates[0], value: undefined });
};

const onAddItem = () => {
  const idx = conditions.value.length;
  const index = idx % props.items.length;
  addItem(index);
};

const showTip = ref(false);

const show = () => {
  setTimeout(() => {
    showTip.value = false;
  }, 5000);
  showTip.value = true;
};

const onDeleteItem = (index: number) => {
  if (conditions.value.length === 1) {
    show();
    return;
  }
  conditions.value.splice(index, 1);
};

onMounted(() => addItem(0));

watch(
  conditions,
  val => {
    console.log(val);
  },
  { deep: true }
);
</script>
