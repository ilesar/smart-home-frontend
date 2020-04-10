import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import RoomController from '@/api/controllers/RoomController';
import ExpenseController from '@/api/controllers/ExpenseController';
import ImageController from '@/api/controllers/ImageController';


const actions: ActionTree<ILocalState, {}> = {
  async upload({commit, getters}, image) {
    return new Promise<any>(((resolve, reject) => {
      ImageController.upload(image).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    }));
  },
};

export default actions;
