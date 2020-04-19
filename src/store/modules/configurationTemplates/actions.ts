import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import Vue from 'vue';
import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';
import ConfigurationTemplateController from '@/api/controllers/ConfigurationTemplateController';


const actions: ActionTree<ILocalState, {}> = {
  async updateConfigurationTemplate({commit, getters}, template: ConfigurationTemplate) {
    return ConfigurationTemplateController.updateOne(template);
  },
};

export default actions;
