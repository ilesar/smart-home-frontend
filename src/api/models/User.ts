import { AxiosError, AxiosResponse } from 'axios';
import { Model } from '@vuex-orm/core';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import UserAPI from '@/api/requests/UserAPI';
import Token from '@/api/models/Token';

export default class Activity extends Model {
  public static entity = 'user';

  public static primaryKey = 'id';

  public static fieldsKeys() {
    return Object.keys(this.fields());
  }

  public static fields() {
    return {
      token: this.attr(null),
    };
  }

  public static async login(data: { username: string, password: string }): Promise<AxiosResponse | AxiosError> {
    let loginResponse;
    try {
      loginResponse = await UserAPI.login(data);
    } catch (e) {
      return Promise.reject(e);
    }
    this.setToken(loginResponse);
    return Promise.resolve(loginResponse);
  }

  public static async setToken(loginResponse: any) {
    LocalStorageService.save(LocalStorageKeyNames.token, loginResponse.data.access_token);
    await Token.setToken(loginResponse.data);
  }

  public static async logout() {
    await this.deleteAll();
    LocalStorageService.remove(LocalStorageKeyNames.token);
    return Promise.resolve();
  }

}
