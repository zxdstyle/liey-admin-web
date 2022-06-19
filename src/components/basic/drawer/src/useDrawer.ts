import { getCurrentInstance, onUnmounted, ref, unref, watch } from 'vue';
import { getDynamicProps } from '@/utils';
import {
  BasicDrawerProps,
  DrawerMethods,
  ReturnDrawerMethods,
  UseDrawerReturnType
} from '@/components/basic/drawer/src/typing';

export function useDrawer(props?: BasicDrawerProps): UseDrawerReturnType {
  const drawer = ref<Nullable<DrawerMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);

  function register(modalMethod: DrawerMethods) {
    if (!getCurrentInstance()) {
      throw new Error('useDrawer() can only be used inside setup() or functional components!');
    }

    onUnmounted(() => {
      drawer.value = null;
      loaded.value = false;
    });
    if (unref(loaded) && modalMethod === unref(drawer)) return;

    drawer.value = modalMethod;
    loaded.value = true;

    watch(
      () => props,
      () => {
        props && modalMethod.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      console.error('useDrawer instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnDrawerMethods = {
    setProps: props => getInstance()?.setProps(props),
    openDrawer: () => getInstance()?.setProps({ show: true }),
    closeDrawer: () => getInstance()?.setProps({ show: false })
  };

  return [register, methods];
}
