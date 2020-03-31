import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';

export interface IShoppingItem {
   id: string;
   groceryItem: string;
   quantity: string;
}

export default class ShoppingItem extends Model {
  public static entity = 'shoppingitem';

  public static primaryKey = 'id';

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
      id: this.increment(),
      groceryItem: this.attr('asdd'),
      quantity: this.string('quantity'),

    };
  }
}