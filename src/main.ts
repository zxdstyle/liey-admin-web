import { createApp } from 'vue';
import { setupAssets, setupPlugins } from './plugins';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import App from './App.vue';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);

  setupPlugins(app);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);

  // mount app
  app.mount('#app');
}

setupApp();
