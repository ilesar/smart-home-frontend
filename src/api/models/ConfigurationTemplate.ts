import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import GroceryItemImage from '@/api/models/GroceryItemImage';
import ShoppingItem from '@/api/models/ShoppingItem';
import StringHelper from '@/helpers/StringHelper';
import ConfigurationItem from '@/api/models/ConfigurationItem';
import ConfigurationTemplateItem from '@/api/models/ConfigurationTemplateItem';


export default class Configuration extends Model {
  public static entity = 'configurationtemplate';

  public static primaryKey = 'id';

  public static fields() {
    return {
      id: this.string(null),
      isActive: this.boolean(false),
      configuration_id: this.attr(undefined),
      items: this.hasMany(ConfigurationTemplateItem, 'configuration_template_id'),
    };
  }

}
