import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
import SvgIcon from '@/components/custom/SvgIcon.vue';

/**
 * 动态渲染iconify
 * @param icon - 图标名称
 * @param color - 图标颜色
 * @param size - 图标大小
 */
export function iconifyRender(icon: string, color?: string, size?: number) {
  const style: { color?: string; fontSize?: string } = {};
  if (color && color.length > 0) {
    style.color = color;
  }
  if (size) {
    style.fontSize = `${size}px`;
  }
  return () => h(NIcon, null, { default: () => h(Icon, { icon, style }) });
}

/**
 * 动态渲染自定义图标
 * @param icon - 图标名称
 * @param color - 图标颜色
 * @param size - 图标大小
 */
export function customIconRender(icon: string, color?: string, size?: number) {
  const style: { color?: string; size?: string } = {};
  if (color) {
    style.color = color;
  }
  if (size) {
    style.size = `${size}px`;
  }

  return () => h(NIcon, null, { default: () => h(SvgIcon, { icon, style }) });
}
