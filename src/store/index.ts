import Vue from 'vue';
import Vuex from 'vuex';
import models from '@/api/models';
import plugins from './plugins';
import modules from './modules';

const entities = Object.keys(models);

Vue.use(Vuex);

export default new Vuex.Store({
  state: { entities },
  modules,
  plugins,
});
