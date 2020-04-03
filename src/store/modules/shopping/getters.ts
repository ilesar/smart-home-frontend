import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';
import {OrderDirection} from '@vuex-orm/core/lib/query/options';

const getters: GetterTree<ILocalState, {}> = {
    getShoppingList(state) {
      return ShoppingItem
        .query()
        .with('groceryItem.image')
        .where('isResolved', false)
        // .orderBy('id', 'desc')
        .all();
    },
    getResolvedList(state) {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', true)
          // .orderBy('id', 'desc')
          .all();
    },
    getGroceryItemList(state) {
        return GroceryItem
          .query()
          .with('image')
          .limit(30)
          .all();
    },
};

export default getters;
