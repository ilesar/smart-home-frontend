import { AxiosError, AxiosResponse } from 'axios';
import { Model } from '@vuex-orm/core';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import Token from '@/api/models/Token';
import {ApiRoutes} from '@/enums/ApiRoutes';

export default class Activity extends Model {
  public static entity = 'user';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.refreshToken,
      },
    },
  };

  public static fieldsKeys() {
    return Object.keys(this.fields());
  }

  public static fields() {
    return {
      token: this.attr(null),
    };
  }

  public static async setToken(token: string) {
    LocalStorageService.save(LocalStorageKeyNames.token, token);
    await Token.setToken(token);
  }

}
