import {ApiRoutes} from '@/enums/ApiRoutes';
import Token from '@/api/models/Token';
import {AxiosError, AxiosResponse} from 'axios';
import {LocalStorageService} from '@/services/LocalStorageService';
import {LocalStorageKeyNames} from '@/enums/LocalStorageKeyNames';

export default class AuthController {
  public static async refreshToken(): Promise<AxiosResponse | AxiosError> {
    let refreshedToken;

    try {
      refreshedToken = await Token.api().post(ApiRoutes.refreshToken, {});
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(refreshedToken.response);
  }

  public static async login(username: string, password: string): Promise<AxiosResponse | AxiosError> {
    let responseObject;

    const requestBody = {
      data: {
        attributes: {
          username,
          password,
        },
      },
    };

    try {
      responseObject = await Token.api().post(ApiRoutes.login, requestBody);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(responseObject);
  }

  public static async logout() {
    LocalStorageService.remove(LocalStorageKeyNames.token);
    return Promise.resolve();
  }
}
