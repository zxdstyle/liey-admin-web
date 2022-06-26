import { computed, unref } from 'vue';
import { NEmpty } from 'naive-ui';
import { BasicEmptyProps } from '../types/empty';
import { BasicTableProps } from '../types/table';

export default function useEmpty(props: Partial<BasicTableProps>) {
  const GetCustomEmpty = computed(() => {
    if (props.customEmpty) return props.customEmpty();
    return NEmpty;
  });

  const emptyBind = computed<Nullable<BasicEmptyProps>>(() => {
    return {
      class: 'my-10',
      description: unref(props).emptyText
    };
  });

  return { GetCustomEmpty, emptyBind };
}
