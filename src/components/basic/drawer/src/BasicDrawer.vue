<template>
  <NDrawer v-bind="getBindValue" @update:show="handleCancel">
    <component :is="getComponent" v-bind="getContentBindValue" @close="handleCancel(false)">
      <slot></slot>
    </component>
  </NDrawer>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, ref, unref, useAttrs, defineComponent } from 'vue';
import { DrawerContentProps, NDrawer, NDrawerContent } from 'naive-ui';
import { merge, omit } from 'lodash-es';
import { BasicDrawerProps, DrawerMethods } from './typing';
import ClassicContent from './components/ClassicContent.vue';

const visibleRef = ref(false);
const propsRef = ref<Partial<BasicDrawerProps> | null>(null);
const contentProps = ref<Partial<DrawerContentProps | null>>(null);
const emit = defineEmits(['register', 'update']);

const attrs = useAttrs();
const getBindValue = computed(() => {
  return {
    ...attrs,
    zIndex: 20000,
    ...unref(propsRef),
    show: unref(visibleRef)
  };
});

const getContentBindValue = computed(() => {
  return {
    closable: true,
    ...unref(contentProps)
  };
});

function setProps(props: Partial<BasicDrawerProps>): void {
  // Keep the last setModalProps
  propsRef.value = merge(unref(propsRef) || ({} as any), omit(props, 'content'));
  contentProps.value = merge(unref(contentProps) || {}, props.content);
  if (Reflect.has(props, 'show')) {
    visibleRef.value = !!props.show;
  }
}

const drawerMethods: DrawerMethods = {
  setProps
};

const instance = getCurrentInstance();
if (instance) {
  emit('register', drawerMethods, instance.uid);
}

async function handleCancel(show: boolean) {
  visibleRef.value = show;
  emit('update');
}

const getComponent = computed<ReturnType<typeof defineComponent>>(() => {
  switch (propsRef.value?.type) {
    case 'classic':
      return ClassicContent;
    default:
      return NDrawerContent;
  }
});
</script>
