import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';

export interface IGroceryItem {
   id: string;
   name: string;
   description: string; price: string; image: string;
}

export default class GroceryItem extends Model {
  public static entity = 'groceryitem';

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
      name: this.string('description'),
      description: this.string('description'),
      price: this.string('price'),
      image: this.string('image'),

    };
  }

}
