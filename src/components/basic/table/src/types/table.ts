import { VNode } from 'vue';
import { VxeGridProps } from 'vxe-table';
import { Filter } from './query';

export interface BasicTableProps extends Omit<VxeGridProps, 'formConfig'> {
  // 自定义空数据
  customEmpty?: () => VNode;
  api: (params?: Recordable) => Promise<any>;
  onUpdate?: (row: Recordable, field: string, value: any) => Promise<any>;
  filter?: Filter;
}

export interface BasicTableInstance {
  setProps: (...args: any) => void;
  reload: () => void;
}

export interface BasicTableMethods extends BasicTableInstance {}
