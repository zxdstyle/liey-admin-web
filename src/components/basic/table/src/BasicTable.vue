<template>
  <n-card ref="wrapRef" class="h-full rounded-xl">
    <Search v-bind="getSearchBindVal" />

    <TableHeader v-bind="getHeaderProps" />

    <NDataTable v-bind="getBindValues" />
  </n-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, useAttrs } from 'vue';
import { NDataTable } from 'naive-ui';
import { isBoolean, omit } from 'lodash-es';
import { useLoading } from '@/hooks';
import { BasicTableInstance, BasicTableProps, SizeType } from '@/components/basic/table';
import { useInnerRegisterComp } from '@/hooks/common/useRegisterComp';
import { useTableHeader } from '@/components/basic/table/src/hooks/useTableHeader';
import useDataSource from './hooks/useDataSource';
import usePagination from './hooks/usePagination';
import { Search, TableHeader } from './components';
import { createTableContext } from './hooks/useTableContext';

const attrs = useAttrs();

// const slots = useSlots();

const wrapRef = ref(null);

const emit = defineEmits(['register', 'fetch-error']);

const { propsRef, setProps } = useInnerRegisterComp<BasicTableProps>();

const { loading, startLoading, endLoading } = useLoading();

const getProps = computed<Partial<BasicTableProps>>(() => {
  return {
    immediate: true,
    ...unref(propsRef)
  };
});

const { getPaginationInfo } = usePagination(getProps);

const { dataSourceRef, reload } = useDataSource(getProps, { emit, startLoading, endLoading, getPaginationInfo });

const { getHeaderProps } = useTableHeader(getProps);

const getBindValues = computed<Partial<BasicTableProps>>(() => {
  return {
    remote: true,
    size: 'large',
    rowKey: rowData => rowData.id,
    loading: loading.value,
    data: unref(dataSourceRef),
    ...attrs,
    ...omit(unref(propsRef), [
      'api',
      'immediate',
      'search',
      'title',
      'description',
      'descriptionRenderType',
      'tableSetting'
    ])
  };
});

const getSearchBindVal = computed(() => {
  const props = unref(propsRef);
  if (isBoolean(props.search)) {
    return { enable: props.search };
  }
  return {
    ...props.search
  };
});

const instance: BasicTableInstance = {
  setProps,
  reload,
  getSize: () => {
    return unref(getBindValues).size as SizeType;
  }
};
createTableContext({ ...instance, getBindValues, wrapRef });

onMounted(() => emit('register', instance));
</script>

<style lang="less" scoped></style>
