/**
 * models is object to hold
 * {
 *   "user" : [user: UserModule extends VuexModel]
 * }
 */
import { toLower } from 'lodash';
import RequireContext = __WebpackModuleApi.RequireContext;

const requiredModule: RequireContext = require.context('.', true, /index\.ts$/);
const modules = {};

requiredModule.keys().forEach((key) => {
  console.log(key);
  if (key === './index.ts') { return; }
  const moduleName = toLower(key.replace(/(\.\/|\.ts)/g, '')).replace(/(\/index)/g, '');
  modules[moduleName] = requiredModule(key).default;
});

export default modules;
