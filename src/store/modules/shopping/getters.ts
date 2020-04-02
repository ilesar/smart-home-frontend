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
          .orderBy('id', 'desc')
          .all()
          .map((shoppingItem: ShoppingItem) => {
              return shoppingItem.groceryItem;
          });
    },
    getGroceryItemList(state) {
        return GroceryItem
          .query()
          .with('image')
          .limit(30)
          .all();
    },
    // sampleGetterWithParameter: (state) => (parameter: string) => {
    //
    // },
};

export default getters;
