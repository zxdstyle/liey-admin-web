import { VNode } from 'vue';
import { VxeGridProps } from 'vxe-table';

export interface BasicTableProps extends VxeGridProps {
  // 自定义空数据
  customEmpty?: () => VNode;
  api: (params?: Recordable) => Promise<any>;
  onUpdate?: (row: Recordable, field: string, value: any) => Promise<any>;
}

export interface BasicTableInstance {
  setProps: (...args: any) => void;
  reload: () => void;
}

export interface BasicTableMethods extends BasicTableInstance {}
