export interface FilterProps {
  items: FilterField[];
}

export interface FilterField {
  name: string;
  label: string;
  operates: OperateType[];
  component: FilterComponentType;
}

export type OperateType = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

export interface Operate {
  key: OperateType;
  label: string;
}

export type FilterComponentType = 'Input' | 'InputNumber' | 'Select' | 'MultiSelect' | 'Datetime';
