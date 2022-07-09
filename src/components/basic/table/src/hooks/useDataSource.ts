import { ComputedRef, onMounted, ref, unref } from 'vue';
import { PaginationProps } from 'naive-ui';
import { get, isFunction } from 'lodash-es';
import { BasicTableProps } from '../types/table';

interface actionType {
  emit: (e: 'fetch-error', error: Error) => void;
  startLoading: () => void;
  endLoading: () => void;
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
}

export default function useDataSource(
  props: ComputedRef<Partial<BasicTableProps>>,
  { emit, startLoading, endLoading, getPaginationInfo }: actionType
) {
  const dataSourceRef = ref<Recordable[]>([]);
  const rawDataSourceRef = ref<Recordable>({});

  async function fetch(opt?: Recordable) {
    const { api, beforeFetch, afterFetch } = unref(props);

    if (!api || !isFunction(api)) return;

    try {
      startLoading();

      const { page = 1, pageSize = 20 } = unref(getPaginationInfo) as PaginationProps;

      let params: Recordable = {
        page,
        pageSize,
        ...opt
      };

      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, 'data');
      // const resultTotal: number = isArrayResult ? res.length : get(res, 'total');

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems;
      }

      dataSourceRef.value = resultItems;
    } catch (error) {
      emit('fetch-error', error as Error);
    } finally {
      endLoading();
    }
  }

  function getRawDataSource<T = Recordable>() {
    return rawDataSourceRef.value as T;
  }

  async function reload(opt?: Recordable) {
    await fetch(opt);
  }

  onMounted(() => {
    setTimeout(() => {
      unref(props).immediate && fetch();
    }, 16);
  });

  return { fetch, getRawDataSource, dataSourceRef, reload };
}
