import type { ComputedRef } from 'vue';
import { unref, computed } from 'vue';
import type { BasicTableProps } from '../types/table';

export function useTableHeader(propsRef: ComputedRef<Partial<BasicTableProps>>) {
  const getHeaderProps = computed((): Recordable => {
    const { title, description, descriptionRenderType, showTableSetting, tableSetting } = unref(propsRef);
    return {
      title,
      description,
      descriptionRenderType,
      showTableSetting,
      tableSetting
    };
  });
  return { getHeaderProps };
}
