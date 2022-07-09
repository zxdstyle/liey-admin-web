import { provide, inject, ComputedRef, Ref } from 'vue';
import type { BasicTableProps, BasicTableInstance } from '../types/table';

const key = Symbol('basic-table');

type Instance = BasicTableInstance & {
  getBindValues: ComputedRef<Recordable>;
  wrapRef: Ref<Nullable<HTMLElement>>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
