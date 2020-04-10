import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';

export default class GroceryItem extends Model {
  public static entity = 'groceryitem';

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
      name: this.string(undefined),
      description: this.string(undefined),
      price: this.string(undefined),
      image: this.hasOne(GroceryItemImage, 'grocery_item_id'),
      createdAt: this.string(undefined),
      updatedAt: this.string(undefined),
    };
  }

  public id;
  public name;
  public price;
  public uploadedImage: string;
  public imageId: string;

}
