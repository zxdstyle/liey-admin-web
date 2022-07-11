import { Component } from 'vue';

export interface FilterProps {
  items: FilterField[];
}

export interface Condition {
  field: string;
  operate: string;
  value: string | string[] | number | undefined;
}

export interface FilterField {
  name: string;
  label: string;
  operates: OperateType[];
  component: FilterComponentType;
  componentProps?: Recordable;
}

export type OperateType = 'match' | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'between';

export interface Operate {
  key: OperateType;
  label: string;
}

export type FilterComponentType = 'Input' | 'InputNumber' | 'Select' | 'MultiSelect' | 'Datetime';

export interface FilterComponent {
  component: Component;
  options: Recordable;
}
