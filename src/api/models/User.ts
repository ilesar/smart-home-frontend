import { Model } from '@vuex-orm/core';

export default class Activity extends Model {
  public static entity = 'user';

  public static primaryKey = 'id';

  public static fieldsKeys() {
    return Object.keys(this.fields());
  }

  public static fields() {
    return {
      id: Model.increment(),
      email: Model.string('ivan.lesar.pmf+smarthome@gmail.com'),
      password: Model.string('admin'),
    };
  }
}
