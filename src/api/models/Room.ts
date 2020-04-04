import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';


export default class Room extends Model {
  public static entity = 'room';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.refreshToken,
      },
    },
  };

  public id;

  public get slug() {
    return StringHelper.slugify(this.name);
  }

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
      name: this.string('roomName'),
    };
  }

}
