import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';
import {OrderDirection} from '@vuex-orm/core/lib/query/options';
import moment from 'moment';
import ShoppingItemRepository from '@/repositories/ShoppingItemRepository';
import GroceryItemRepository from '@/repositories/GroceryItemRepository';

const getters: GetterTree<ILocalState, {}> = {
  getGroceryItemList(state) {
    return GroceryItemRepository.getAll();
  },
};

export default getters;
