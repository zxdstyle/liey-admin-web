// Filter 查询支持的过滤方式
import { VxeGridPropTypes } from 'vxe-table/types/grid';

export type FilterMethod = 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'match';

export interface Filter extends VxeGridPropTypes.FormConfig {}
