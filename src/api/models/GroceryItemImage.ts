import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';

export interface IGroceryItemImage {
   id: string;
   image: string;
}

export default class GroceryItemImage extends Model {
  public static entity = 'groceryitemimage';

  public static primaryKey = 'id';

  public image;

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.refreshToken,
      },
    },
  };

  public static fieldsKeys() {
    return keys(this.fields());
  }

  public get path() {
    return this.image;
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
      image: this.string('image_url'),
      grocery_item_id: this.attr(null),
    };
  }

}
