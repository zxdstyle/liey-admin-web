import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { getDynamicProps } from '@/utils';
import { CrudInstance, CrudProps } from '../types/crud';

export default function useCrud(props: CrudProps) {
  const crudRef = ref<Nullable<CrudInstance>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  function register(instance: CrudInstance) {
    onUnmounted(() => {
      crudRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(crudRef)) {
      return;
    }

    crudRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  async function getInstance() {
    const instance = unref(crudRef);
    if (!instance) {
      console.error(
        'The crud instance has not been obtained, please make sure that the crud has been rendered when performing the crud operation!'
      );
    }
    await nextTick();
    return instance as CrudInstance;
  }

  const methods = {
    reload: async () => {
      const instance = await getInstance();
      return instance.reload();
    }
  };

  return [register, methods];
}
