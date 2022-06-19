<template>
  <n-card class="rounded-xl h-full">
    <BasicTable @register="registerTable">
      <template #left></template>
      <template #toolbar>
        <n-button type="primary" @click="openCreateModal"><Icon icon="ph:plus-bold" />新增菜单</n-button>
      </template>
    </BasicTable>

    <BasicModal style="width: 900px" @register="registerModal">
      <MenuForm v-bind="getFormBind" />
    </BasicModal>

    <BasicDrawer @register="registerDrawer">
      <Dispatch :menu-id="state.model.id" />
    </BasicDrawer>
  </n-card>
</template>

<script lang="tsx" setup>
import { computed, h, onMounted, reactive } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { iconifyRender } from '@/utils';
import { BasicTable, useTable, TableActionOption, TableAction } from '@/components/basic/table';
import { BasicModal, useModal } from '@/components/basic/modal';
import { ApiSwitch } from '@/components/basic/form';
import ApiMenu from '@/service/api/scaffold/menu';
import useBasicDialog from '@/hooks/common/useDialog';
import { BasicDrawer, useDrawer } from '@/components/basic/drawer';
import MenuForm from './form.vue';
import Dispatch from './components/dispatch.vue';

interface State {
  model: Api.Menu;
}

const [registerModal, { openModal, setModalProps, closeModal }] = useModal();

const [registerDrawer, { openDrawer }] = useDrawer({
  width: '40%',
  type: 'classic',
  content: { title: '授权', bodyStyle: { padding: '32px', backgroundColor: 'rgb(253, 254, 255)' } }
});

const actions: TableActionOption = [
  { key: 'edit', label: '编辑', icon: iconifyRender('ep:edit', '', 18) },
  { key: 'dispatch', label: '授权', icon: iconifyRender('codicon:shield', '', 18) },
  { type: 'divider' },
  {
    key: 'delete',
    label: '删除',
    icon: iconifyRender('ci:trash-full', 'red', 18),
    props: { class: 'important-text-red' }
  }
];

const { warning } = useBasicDialog();
const [registerTable, { reload }] = useTable<Api.Menu>({
  api: ApiMenu.TreeData,
  columns: [
    { type: 'selection' },
    { key: 'id', title: 'ID', sorter: { multiple: 2 } },
    { key: 'title', title: '菜单名称' },
    { key: 'name', title: '菜单唯一标识' },
    { key: 'path', title: '菜单路径' },
    {
      key: 'hidden',
      title: '是否隐藏',
      render(row) {
        return (
          <ApiSwitch
            v-model:value={row.hidden}
            api={(params: any) => ApiMenu.Update(row.id, params)}
            field="hidden"
          ></ApiSwitch>
        );
      }
    },
    { key: 'sort_num', title: '排序值', sorter: { multiple: 1 } },
    {
      key: 'icon',
      title: '图标',
      render({ icon }) {
        return h(
          'div',
          {
            class: ['flex', 'gap-2']
          },
          [
            h(Icon, {
              icon,
              style: { fontSize: '24px' }
            }),
            icon
          ]
        );
      }
    },
    {
      key: 'action',
      title: '操作',
      align: 'center',
      render(row) {
        return <TableAction actions={actions} onSelect={(key: string) => handleTableAction(key, row)} />;
      }
    }
  ],
  pagination: false,
  searchInfo: { 'order.sort_num': 'desc', 'order.id': 'desc' }
});

const state = reactive<State>({
  model: {} as Api.Menu
});

const openEditModal = () => {
  setModalProps({ title: '编辑菜单' });
  openModal();
};

const handleDelete = async (row: Api.Menu) => {
  await ApiMenu.Destroy(row.id);
  await reload();
};

function handleTableAction(key: string, row: Api.Menu) {
  state.model = row;
  switch (key) {
    case 'edit':
      openEditModal();
      break;
    case 'dispatch':
      openDrawer();
      break;
    case 'delete':
      warning('子菜单将被一起删除，是否确认删除该菜单？', () => handleDelete(row));
      break;
    default:
  }
}

const openCreateModal = () => {
  state.model = {} as Api.Menu;
  openModal();
  setModalProps({ title: '新增菜单' });
};

const getFormBind = computed(() => {
  return {
    model: state.model,
    onSubmit: () => {
      closeModal();
      reload();
    }
  };
});

onMounted(() => reload());
</script>

<style lang="less" scoped></style>
