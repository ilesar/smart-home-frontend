import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';


const actions: ActionTree<ILocalState, {}> = {
  async fetchGroceryItemList({commit, getters}) {
    return GroceryController.fetchAll().catch((error) => {
      console.error(error);
    });
  },
  async createGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.createOne(groceryItem).catch((error) => {
      console.error(error);
    });
  },
  async updateGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.updateOne(groceryItem).catch((error) => {
      console.error(error);
    });
  },
  async deleteGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.deleteOne(groceryItem).catch((error) => {
      console.error(error);
    });
  },
};

export default actions;
