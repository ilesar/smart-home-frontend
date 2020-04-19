import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';
import ConfigurationItem from '@/api/models/ConfigurationItem';


export default class ConfigurationTemplateItem extends Model {
  public static entity = 'configurationtemplateitem';

  public static primaryKey = 'id';
  public id;
  public configurationItem;
  public value;

  public static fields() {
    return {
      id: this.string(null),
      configuration_template_id: this.attr(undefined),
      value: this.string(undefined),
      configurationItem: this.hasOne(ConfigurationItem, 'configuration_template_item_id'),
    };
  }

}
