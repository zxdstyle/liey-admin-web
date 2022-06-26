<template>
  <Grid v-bind="getBindVal">
    <template #empty>
      <GetCustomEmpty v-bind="emptyBind" />
    </template>
  </Grid>
</template>

<script lang="tsx" setup>
import { computed, onMounted, ref, unref } from 'vue';
import XEUtils from 'xe-utils';
import { VXETable, Grid, VxeGridProps, VxeTableEvents } from 'vxe-table';
import zhCN from 'vxe-table/es/locale/lang/zh-CN';
import { merge, omit } from 'lodash-es';
import { useLoading } from '@/hooks';
import useDataSource from './hooks/useDataSource';
import useEmpty from './hooks/useEmpty';
import { BasicTableInstance, BasicTableProps } from './types/table';

const propsRef = ref<Partial<BasicTableProps>>({});

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
});

const { loading, startLoading, endLoading } = useLoading();

const emit = defineEmits(['register']);

const onEditClosed: VxeTableEvents.EditClosed = ({ row, column, $table }) => {
  if (!$table.isUpdateByRow(row, column.field)) {
    return;
  }

  const { onUpdate } = unref(propsRef);
  if (!onUpdate) {
    $table.revertData(row, column.field);
    console.error('缺少 `onUpdate` 回调');
    return;
  }

  startLoading();
  onUpdate(row, column.field, row[column.field])
    .then(() => {
      $table.reloadRow(row, null, column.field);
    })
    .catch(() => $table.revertData(row, column.field))
    .finally(() => endLoading());
};

const { onQuery } = useDataSource(unref(propsRef));

const getBindVal = computed<VxeGridProps>(() => {
  return {
    round: true,
    stripe: true,
    size: 'medium',
    autoResize: true,
    loading: loading.value,
    filterConfig: { remote: true },
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    proxyConfig: {
      sort: true,
      filter: true,
      form: true,
      autoLoad: true,
      props: { result: 'data', list: 'data', total: 'meta.total' },
      ajax: {
        query: params => onQuery(params)
      }
    },
    sortConfig: {
      remote: true,
      multiple: true,
      chronological: true
    },
    toolbarConfig: { refresh: true, resizable: true },
    ...omit(unref(propsRef), ['empty', 'api', 'onUpdate']),
    onEditClosed
  };
});

const { GetCustomEmpty, emptyBind } = useEmpty(unref(propsRef));

async function setProps(props: Partial<BasicTableProps>) {
  propsRef.value = merge(unref(propsRef) || {}, props);
}

const instance: BasicTableInstance = {
  setProps,
  reload: () => {}
};

onMounted(() => emit('register', instance));
</script>

<style lang="less" scoped></style>
