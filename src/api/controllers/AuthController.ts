import {ApiRoutes} from '@/enums/ApiRoutes';
import Token from '@/api/models/Token';
import {AxiosError, AxiosResponse} from 'axios';
import {LocalStorageService} from '@/services/LocalStorageService';
import {LocalStorageKeyNames} from '@/enums/LocalStorageKeyNames';
import User from '@/api/models/User';

export default class AuthController {
  public static async refreshToken(): Promise<AxiosResponse | AxiosError> {
    let refreshedToken;

    try {
      refreshedToken = await Token.api().post(ApiRoutes.refreshToken, {});
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(refreshedToken);
  }

  public static async login(data: { username: string, password: string }): Promise<AxiosResponse | AxiosError> {
    let loginResponse;
    const request = {
      data: {
        attributes: {
          username: data.username,
          password: data.password,
        },
      },
    };
    try {
      loginResponse = await User.api().post(ApiRoutes.login, request);
    } catch (e) {
      return Promise.reject(e);
    }

    User.setToken(loginResponse.response);
    return Promise.resolve(loginResponse);
  }

  public static async logout() {
    await User.deleteAll();
    LocalStorageService.remove(LocalStorageKeyNames.token);
    return Promise.resolve();
  }
}
