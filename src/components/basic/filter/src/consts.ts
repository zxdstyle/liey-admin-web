import { NInput, NInputNumber, NSelect, NDatePicker } from 'naive-ui';
import { FilterComponentType, FilterComponent, Operate, OperateType } from './typing';

const operateMap = new Map<OperateType, Operate>();
operateMap.set('match', { key: 'match', label: '匹配' });
operateMap.set('eq', { key: 'eq', label: '等于' });
operateMap.set('neq', { key: 'neq', label: '不等于' });
operateMap.set('lt', { key: 'lt', label: '小于' });
operateMap.set('lte', { key: 'lte', label: '小于等于' });
operateMap.set('gt', { key: 'gt', label: '大于' });
operateMap.set('gte', { key: 'gte', label: '大于等于' });
operateMap.set('in', { key: 'in', label: '包含' });
operateMap.set('between', { key: 'between', label: '之间' });

const componentMap = new Map<FilterComponentType, FilterComponent>();
componentMap.set('Input', { component: NInput, options: { clearable: true } });
componentMap.set('InputNumber', { component: NInputNumber, options: { clearable: true } });
componentMap.set('Select', { component: NSelect, options: { clearable: true, filterable: true } });
componentMap.set('MultiSelect', {
  component: NSelect,
  options: { clearable: true, multiple: true, tag: true, filterable: true }
});
componentMap.set('Datetime', { component: NDatePicker, options: { clearable: true, type: 'datetime' } });

export { operateMap, componentMap };
