import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryItemRepository from '@/repositories/GroceryItemRepository';

const getters: GetterTree<ILocalState, {}> = {
  getGroceryItemList(state) {
    return GroceryItemRepository.getAll();
  },
};

export default getters;
