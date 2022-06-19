import type { PluginOption } from 'vite';
import vue from './vue';
import html from './html';
import unplugin from './unplugin';
import unocss from './unocss';
import visualizer from './visualizer';
import compress from './compress';
import demand from './demand';
import mock from './mock';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [...vue, html(viteEnv), ...unplugin, unocss, mock, demand];

  if (viteEnv.VITE_VISUALIZER === 'true') {
    plugins.push(visualizer);
  }
  if (viteEnv.VITE_COMPRESS === 'true') {
    plugins.push(compress(viteEnv));
  }

  return plugins;
}
