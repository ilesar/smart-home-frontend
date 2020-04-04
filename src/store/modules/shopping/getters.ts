import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItemRepository from '@/repositories/ShoppingItemRepository';

const getters: GetterTree<ILocalState, {}> = {
    getShoppingList(state) {
      return ShoppingItemRepository.getUnresolved();
    },
    getResolvedList(state) {
        return ShoppingItemRepository.getResolved();
    },
    getShoppingListSum(state) {
        return ShoppingItemRepository.getUnresolvedPriceSum();
    },
};

export default getters;
