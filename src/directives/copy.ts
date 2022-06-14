import { App, h, Directive, render } from 'vue';
import CopyButton from '@/components/custom/CopyButton.vue';

export default function setupCopyDirective(app: App) {
  const copyDirective: Directive<HTMLElement, any> = {
    mounted(el: HTMLElement, binding) {
      const icon = h(CopyButton, { value: binding.value });
      render(icon, el);
    }
  };

  app.directive('copy', copyDirective);
}
