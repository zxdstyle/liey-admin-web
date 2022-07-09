import { Component } from 'vue';
import Input from './components/Input.vue';
import Select from './components/Select.vue';
import Datetime from './components/Datetime.vue';
import InputNumber from './components/InputNumber.vue';
import MultiSelect from './components/MultiSelect.vue';
import { FilterComponentType, Operate, OperateType } from './typing';

const componentMap = new Map<FilterComponentType, Component>();
componentMap.set('Input', Input);
componentMap.set('Select', Select);
componentMap.set('Datetime', Datetime);
componentMap.set('InputNumber', InputNumber);
componentMap.set('MultiSelect', MultiSelect);

const operates = new Map<OperateType, Operate>();
operates.set('eq', { key: 'eq', label: '等于' });
operates.set('neq', { key: 'neq', label: '不等于' });
operates.set('lt', { key: 'lt', label: '小于' });
operates.set('lte', { key: 'lte', label: '小于等于' });
operates.set('gt', { key: 'gt', label: '大于' });
operates.set('gte', { key: 'gte', label: '大于等于' });
operates.set('in', { key: 'in', label: '包含' });
