import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { merge } from 'lodash-es';
import { getDynamicProps } from '@/utils';

export function useRegisterComp<T, N extends RegisterComp<T>>(props: T) {
  const instanceRef = ref<Partial<N>>({});
  const loadedRef = ref<Nullable<boolean>>(false);

  const register = (instance: N) => {
    if (unref(loadedRef) && instance === unref(instanceRef)) {
      return;
    }

    onUnmounted(() => {
      instanceRef.value = null;
      loadedRef.value = null;
    });

    instanceRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true
      }
    );
  };

  function getInstance() {
    const instance = unref(instanceRef);
    if (!instance) {
      console.error(
        'The instance has not been obtained, please make sure that has been rendered when performing the operation!'
      );
    }
    nextTick();
    return instance as N;
  }

  return { register, getInstance };
}

export function useInnerRegisterComp<T>() {
  const propsRef = ref<Partial<T>>({});

  async function setProps(formProps: Partial<T>): Promise<void> {
    propsRef.value = merge(unref(propsRef) || {}, formProps);
  }

  return { propsRef, setProps };
}
