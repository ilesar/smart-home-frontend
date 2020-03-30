import { toLower } from 'lodash';

const requiredModels = require.context('.', false, /\.ts$/);
const models = {};

requiredModels.keys().forEach((key) => {
  if (key === './index.ts') { return; }
  const moduleName = toLower(key.replace(/(\.\/|\.ts)/g, ''));
  models[moduleName] = requiredModels(key).default;
});

export default models;
