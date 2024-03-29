import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';
import GroceryItem from '@/api/models/GroceryItem';
import RecurringPayment from '@/api/models/RecurringPayment';


export default class Expense extends Model {
  public static entity = 'expense';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.RefreshToken,
      },
    },
  };

  public static fieldsKeys() {
    return keys(this.fields());
  }

  public static relationFields() {
    /**
     * fields that has relations
     * return {Array} fields which value are BelongsTo
     */
    return keys(this.fields()).reduce((list, field) => {
      if (this.fields()[field] instanceof BelongsTo) {
        list.push(`${field}id`);
        list.push(field);
      }
      return list;
    }, []);
  }

  public static fields() {
    return {
      id: this.string(null),
      slug: this.string(null),
      dueDate: this.string(null),
      isResolved: this.boolean(false),
      updatedAt: this.string(null),
      recurringPayment_id: this.attr(null),
      recurringPayment: this.belongsTo(RecurringPayment, 'recurringPayment_id'),
    };
  }

  public id;
  public recurringPayment;
}
