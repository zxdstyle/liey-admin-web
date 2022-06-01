import type { Component } from 'vue';
import { tryOnUnmounted } from '@vueuse/core';
import type { ComponentType } from '../types/index';
import { add, del } from '../componentMap';

export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}
