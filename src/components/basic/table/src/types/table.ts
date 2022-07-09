import { VNode } from 'vue';
import { DataTableProps } from 'naive-ui';
import { FilterProps } from '@/components/basic/filter';
import { SearchProps } from './search';

export interface BasicTableProps extends DataTableProps {
  /**
   * Table title renderer
   * @type Function | ScopedSlot
   */
  title?: VNode | JSX.Element | string | ((data: Recordable) => string);
  // 标题右侧提示
  description?: string;
  // 标题右侧提示渲染方式
  descriptionRenderType?: 'text' | 'tooltip';
  // 是否显示表格设置
  showTableSetting?: boolean;
  // 表格设置
  tableSetting?: TableSetting;
  // 立即请求接口
  immediate?: boolean;
  // 接口请求对象
  api: (...arg: any) => Promise<any>;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义处理接口返回参数
  afterFetch?: Fn;
  // 表单搜索
  search?: SearchProps | boolean;
}

export interface BasicTableInstance extends RegisterComp<BasicTableProps> {
  reload: (opt?: Recordable) => Promise<void>;
  getSize: () => SizeType;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  fullScreen?: boolean;
  advanceFilter?: boolean | FilterProps;
}

export type ColumnChangeParam = {
  dataIndex: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};

export type SizeType = 'small' | 'medium' | 'large';
