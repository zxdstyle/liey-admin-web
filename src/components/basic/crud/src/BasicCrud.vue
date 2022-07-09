<template>
  <BasicTable @register="registerBasicTable" />
</template>

<script lang="ts" setup>
import ApiRole from '@/service/api/scaffold/role';
import { BasicTable, useBasicTable } from '@/components/basic/table';

const [registerBasicTable, _] = useBasicTable({
  title: '角色管理',
  description: '角色管理以及权限分配',
  showTableSetting: true,
  api: ApiRole.Index,
  columns: [
    { type: 'selection' },
    { key: 'id', title: 'ID' },
    { key: 'name', title: '角色名称' },
    { key: 'slug', title: '标识' },
    { key: 'created_at', title: '创建时间' }
  ],
  tableSetting: {
    advanceFilter: {
      items: [
        { name: 'name', operates: ['eq'], label: '角色名称', component: 'Input' },
        { name: 'slug', operates: ['eq'], label: '标识', component: 'Input' },
        { name: 'created_at', operates: ['eq'], label: '创建时间', component: 'Datetime' }
      ]
    }
  }
});
</script>

<style lang="less" scoped></style>
