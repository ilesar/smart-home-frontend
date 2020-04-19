import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import Vue from 'vue';
import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';
import ConfigurationTemplateController from '@/api/controllers/ConfigurationTemplateController';


const actions: ActionTree<ILocalState, {}> = {
  // async send({commit, getters}, configuration: Configuration) {
  //   console.log('SEND');
  //   console.log(configuration);
  //   const payload = [];
  //
  //   for (let i = 0; i < configuration.size; i++) {
  //     const colorInput = this.$refs['configitem' + this.currentConfiguration.items[i].id] as any;
  //     const colorValue = colorInput.getValue();
  //
  //     payload.push({
  //       r: parseInt(colorValue[0]),
  //       g: parseInt(colorValue[1]),
  //       b: parseInt(colorValue[2]),
  //     });
  //   }
  //
  //   Vue.$mqtt.publish('15ledstrip', JSON.stringify(
  //     {
  //       '_': '_',
  //       'configs': payload,
  //     }
  //   ));
  // },
};

export default actions;
