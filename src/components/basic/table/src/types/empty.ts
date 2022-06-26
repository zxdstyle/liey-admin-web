import { VNode } from 'vue';
import { EmptyProps } from 'naive-ui';

export interface BasicEmptyProps extends EmptyProps {
  customDescription?: () => VNode;
  extra?: () => VNode;
  icon?: () => VNode;
  custom?: () => VNode;
}
