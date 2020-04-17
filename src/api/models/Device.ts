import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {AxiosError, AxiosResponse} from 'axios';
import {ApiRoutes} from '@/enums/ApiRoutes';
import StringHelper from '@/helpers/StringHelper';
import ConfigurationItem from '@/api/models/ConfigurationItem';
import Configuration from '@/api/models/Configuration';


export default class Device extends Model {
  public static entity = 'device';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.RefreshToken,
      },
    },
  };

  public get activeConfigurationTemplate() {
    for (const template of this.configuration.template)
    return
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
      name: this.string('deviceName'),
      slug: this.string(null),
      deviceType: this.string('deviceName'),
      deviceId: this.string(undefined),
      configuration: this.hasOne(Configuration, 'device_id'),
    };
  }

  public static beforeCreate(model) {
    model.slug = StringHelper.slugify(model.name);
  }

  public id;
  public slug;
  public configuration;
  public deviceId;

}
