/**
 * plugins/app.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/components/` folder.
 */

// Imports
import Vue from 'vue';

const requireComponent = require.context('@/components', true, /\.vue$/);

for (const file of requireComponent.keys()) {
  const componentConfig = requireComponent(file);

  Vue.component(componentConfig.default.name, componentConfig.default || componentConfig);
}
