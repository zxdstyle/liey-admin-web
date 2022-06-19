<template>
  <h1 class="text-3xl font-medium">请为菜单「{{ state.menu?.title }}」授权角色</h1>

  <p class="mt-12 text-lg">可以指定多个角色，菜单及其子菜单都会一起授权给指定角色访问。</p>

  <div class="mt-12">
    <n-card title="已授权角色" class="rounded-xl" hoverable>
      <n-empty v-if="state.menu?.roles?.length === 0" description="暂无已授权的角色" />
      <div v-if="loading" class="flex gap-2">
        <n-skeleton :height="34" :width="84" :sharp="false" />
        <n-skeleton :height="34" :width="84" :sharp="false" />
        <n-skeleton :height="34" :width="84" :sharp="false" />
      </div>
      <Draggable :list="state.menu?.roles" item-key="id" group="options" :sort="false" @change="onUpdate">
        <template #item="{ element }">
          <n-tag size="large" type="info" :bordered="false" class="mr-2 mb-2 cursor-move">
            <template #icon>
              <Icon icon="mdi:drag" width="22" />
            </template>
            {{ element.name }}
          </n-tag>
        </template>
      </Draggable>
    </n-card>

    <n-card class="rounded-xl mt-12" hoverable>
      <template #header>
        <div class="flex">
          <h1>未授权角色<small class="text-xs text-gray-500">（拖拽角色即可调整授权）</small></h1>
        </div>
      </template>
      <Draggable :list="state.roles" item-key="id" group="options" :sort="false">
        <template #item="{ element }">
          <n-tag size="large" type="info" :bordered="false" class="mr-2 mb-2 cursor-move">
            <template #icon>
              <Icon icon="mdi:drag" width="22" />
            </template>
            {{ element.name }}
          </n-tag>
        </template>
      </Draggable>
      <n-empty v-if="state.roles?.length === 0" description="暂无可授权的角色" />
    </n-card>
  </div>

  <!--  <basic-button class="mt-12 w-64 h-10" type="info">绑定权限</basic-button>-->
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import Draggable from 'vuedraggable';
import { Icon } from '@iconify/vue';
import { useLoading } from '@/hooks';
import ApiMenu from '@/service/api/scaffold/menu';
import ApiRole from '@/service/api/scaffold/role';

interface State {
  menu: Partial<Api.Menu> | null;
  roles: Api.Role[];
}

const props = defineProps({
  menuId: {
    type: Number,
    required: true
  }
});

const state = reactive<State>({
  roles: [],
  menu: {}
});

const { loading, startLoading, endLoading } = useLoading();

const getDetail = async (id: number) => {
  startLoading();
  const { data } = await ApiMenu.Show(id, { 'with.roles': '*' });
  state.menu = data;
  endLoading();
};

const getRoles = async () => {
  const { data } = await ApiRole.Index();
  state.roles = data as Api.Role[];
};

onMounted(() => getDetail(props.menuId));
onMounted(() => getRoles());

const onUpdate = async () => {
  startLoading();
  await ApiMenu.Update(props.menuId, {
    roles: state.menu?.roles
  });
  endLoading();
};
</script>

<style lang="less" scoped></style>
