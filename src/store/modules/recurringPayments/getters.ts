import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';
import {OrderDirection} from '@vuex-orm/core/lib/query/options';
import moment from 'moment';

const getters: GetterTree<ILocalState, {}> = {
  getRecurringPaymentList(state) {
      return ShoppingItem
        .query()
        .with('groceryItem.image')
        .where('isResolved', false)
        .all();
    },
};

export default getters;
