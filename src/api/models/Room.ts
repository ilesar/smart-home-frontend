import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import {ApiRoutes} from '@/enums/ApiRoutes';
import StringHelper from '@/helpers/StringHelper';
import Device from '@/api/models/Device';


export default class Room extends Model {
  public static entity = 'room';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.RefreshToken,
      },
    },
  };

  public id;
  public devices;

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
      slug: this.string(null),
      device_ids: this.attr([]),
      devices: this.hasManyBy(Device, 'device_ids'),
    };
  }

  static beforeCreate (model) {
    model.slug = StringHelper.slugify(model.name);
  }

}
