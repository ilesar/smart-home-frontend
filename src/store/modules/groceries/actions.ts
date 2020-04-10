import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';


const actions: ActionTree<ILocalState, {}> = {
  async fetchGroceryItemList({commit, getters}) {
    return GroceryController.fetchAll();
  },
  async createGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    return GroceryController.createOne(groceryItem);
  },
  async updateGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    return GroceryController.updateOne(groceryItem);
  },
  async deleteGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    return GroceryController.deleteOne(groceryItem);
  },
};

export default actions;
