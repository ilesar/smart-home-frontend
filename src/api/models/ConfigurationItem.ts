import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';


export default class ConfigurationItem extends Model {
  public static entity = 'configurationitem';

  public static primaryKey = 'id';

  public name;
  public description;
  public inputType;

  public static fields() {
    return {
      id: this.string(null),
      name: this.string(undefined),
      description: this.string(undefined),
      inputType: this.string(undefined),
      configuration_id: this.attr(undefined),
    };
  }

}
