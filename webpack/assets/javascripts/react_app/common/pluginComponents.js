import componentRegistry from './componentRegistry';
import _ from 'lodash';

export default function register(bundleNames) {
  console.log(bundleNames)
  _.forEach(bundleNames, (name) => {
    let pluginComponents = require(name + '/components');
    registerPluginComponents(pluginComponents);
  });
}

let registerPluginComponents = (pluginComponents) => {
  for (let [name, component] of Object.entries(pluginComponents)) {
    componentRegistry.register(name, component);
  }
};
