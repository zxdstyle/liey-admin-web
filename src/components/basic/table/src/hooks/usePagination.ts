import { computed, ComputedRef, ref, unref } from 'vue';
import { PaginationProps } from 'naive-ui';
import { isBoolean } from 'lodash-es';
import { BasicTableProps } from '../types/table';

export default function usePagination(refProps: ComputedRef<Partial<BasicTableProps>>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {};
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    };
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPaginationInfo, setPagination, getShowPagination, setShowPagination };
}
