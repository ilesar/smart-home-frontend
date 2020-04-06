import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';


const actions: ActionTree<ILocalState, {}> = {
  async fetchGroceryItemList({commit, getters}) {
    GroceryController.fetchAll().then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async createGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.createOne(groceryItem).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async deleteGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.deleteOne(groceryItem).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async updateGroceryItem({commit, getters}, groceryItem: GroceryItem) {
    GroceryController.updateOne(groceryItem).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
};

export default actions;
