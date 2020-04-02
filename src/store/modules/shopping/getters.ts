import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';

const getters: GetterTree<ILocalState, {}> = {
    getShoppingList(state) {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .limit(10)
          .all()
          .map((shoppingItem: ShoppingItem) => {
              return shoppingItem.groceryItem;
          });
    },
    getGroceryItemList(state) {
        return GroceryItem
          .query()
          .with('image')
          .limit(10)
          .all();
    },
    // sampleGetterWithParameter: (state) => (parameter: string) => {
    //
    // },
};

export default getters;
