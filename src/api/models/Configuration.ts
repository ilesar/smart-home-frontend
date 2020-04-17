import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';
import ConfigurationItem from '@/api/models/ConfigurationItem';


export default class Configuration extends Model {
  public static entity = 'configuration';

  public static primaryKey = 'id';

  public items: ConfigurationItem[];

  public get size(): number {
    return this.items.length;
  }

  public static fields() {
    return {
      id: this.string(null),
      device_id: this.attr(null),
      items: this.hasMany(ConfigurationItem, 'configuration_id'),
    };
  }

}
