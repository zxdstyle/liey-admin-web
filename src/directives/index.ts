import type { App } from 'vue';
import setupCopyDirective from '@/directives/copy';
import setupNetworkDirective from './network';
import setupLoginDirective from './login';
import setupPermissionDirective from './permission';
import setupPlugins from './plugin';

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app: App) {
  setupNetworkDirective(app);
  setupLoginDirective(app);
  setupPermissionDirective(app);
  setupCopyDirective(app);
  setupPlugins(app);
}
