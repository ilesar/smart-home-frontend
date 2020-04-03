import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';
import {OrderDirection} from '@vuex-orm/core/lib/query/options';
import moment from 'moment';

const getters: GetterTree<ILocalState, {}> = {
    getShoppingList(state) {
      return ShoppingItem
        .query()
        .with('groceryItem.image')
        .where('isResolved', false)
        .all();
    },
    getResolvedList(state) {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', true)
          .all();
    },
    getGroceryItemList(state) {
        return GroceryItem
          .query()
          .with('image')
          .limit(30)
          .all();
    },
    getShoppingListSum(state) {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', false)
          .all()
          .reduce((aggregator: number, shoppingItem: ShoppingItem) => {
              return aggregator + parseFloat(shoppingItem.quantity) * shoppingItem.groceryItem.price;
          }, 0).toFixed(2);
    },
    getShoppingListItemCount(state) {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', false)
          .all()
          .reduce((aggregator: number, shoppingItem: ShoppingItem) => {
              return aggregator + parseFloat(shoppingItem.quantity);
          }, 0);
    },
    getShoppingListAge(state) {
        const item = ShoppingItem
          .query()
          .with('groceryItem.image')
          .orderBy((shoppingItem: ShoppingItem) => moment(shoppingItem.createdAt))
          .where('isResolved', false)
          .first();

        if (item === null) {
          return;
        }

        // return moment(item).locale('hr').calendar();
      console.log(item.createdAt);
      const diff = moment(new Date()).diff(moment(item.createdAt), 'hours');
        const duration = moment.duration(diff);
      console.log('duration', duration);
      const years = duration.years();
        const days = duration.days();
        const hrs = duration.hours();
        const mins = duration.minutes();
        const secs = duration.seconds();

        return `${years} years ${days} days ${hrs} hourse ${mins} min ${secs} seconds`
    },
};

export default getters;
