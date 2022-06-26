import { App } from 'vue';
import setupAssets from './assets';
import setupVxeTable from './vxe-table';

function setupPlugins(app: App) {
  setupVxeTable(app);
}

export { setupAssets, setupPlugins };
