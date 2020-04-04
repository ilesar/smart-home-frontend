import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';
import ShoppingItem from '@/api/models/ShoppingItem';


const actions: ActionTree<ILocalState, {}> = {
  async fetchGroceryItemList({commit, getters}, productFormId) {
    GroceryController.fetchAll().then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
};

export default actions;
