<template>
  <n-card class="h-full">
    <BasicTable @register="registerBasicTable" />
  </n-card>
</template>

<script lang="tsx" setup>
import ApiRole from '@/service/api/scaffold/role';
import { BasicTable, useBasicTable } from '@/components/basic/table';

const [registerBasicTable] = useBasicTable({
  emptyText: '暂无数据',
  keepSource: true,
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'id', title: 'ID', sortable: true },
    { field: 'name', title: '角色名称', sortable: true, editRender: { name: 'Input' } },
    {
      field: 'slug',
      title: '标识',
      filters: [{ label: 'a', value: 'admin' }]
    },
    { field: 'created_at', title: '创建时间' }
  ],
  filter: {
    enabled: true,
    items: [
      {
        field: 'name',
        title: '角色名称',
        itemRender: { name: '$input', props: { placeholder: '请输入角色名称筛选' } },
        span: 5
      },
      {
        field: 'slug',
        title: '角色标识',
        itemRender: { name: '$input', props: { placeholder: '请输入角色标识筛选' } },
        span: 5
      },
      {
        span: 24,
        align: 'right',
        collapseNode: true,
        itemRender: {
          name: '$buttons',
          children: [
            { props: { type: 'submit', content: '搜索', status: 'primary' } },
            { props: { type: 'reset', content: '重置' } }
          ]
        }
      }
    ]
  },
  api: ApiRole.Index,
  onUpdate: (row, field, value) => ApiRole.Update(row.id, { field: value })
});
</script>

<style lang="less" scoped></style>
