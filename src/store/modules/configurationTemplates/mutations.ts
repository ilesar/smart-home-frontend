import { MutationTree } from 'vuex';
import ILocalState from './stateInterface';
import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';

const mutations: MutationTree<ILocalState> = {
  activateLocalTemplate(state, currentTemplate: ConfigurationTemplate) {
      const templates = ConfigurationTemplate.query().where('configuration_id', currentTemplate.configuration.id).get();

      for (const template of templates) {
        if (template.isActive) {
          ConfigurationTemplate.update({
            where: template.id,
            data: {
              isActive: false,
            },
          });

          break;
        }
      }

      ConfigurationTemplate.update({
        where: currentTemplate.id,
        data: {
          isActive: false,
        },
      });
    },
};

export default mutations;
