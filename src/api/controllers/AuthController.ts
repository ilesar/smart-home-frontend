import {ApiRoutes} from '@/enums/ApiRoutes';
import Token from '@/api/models/Token';
import {AxiosError, AxiosResponse} from 'axios';
import {LocalStorageService} from '@/services/LocalStorageService';
import {LocalStorageKeyNames} from '@/enums/LocalStorageKeyNames';
import User from '@/api/models/User';
import {debug} from 'webpack';

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
    let loginResponse;
    const request = {
      data: {
        attributes: {
          username: username,
          password: password,
        },
      },
    };
    try {
      loginResponse = await User.api().post(ApiRoutes.login, request);
    } catch (e) {
      return Promise.reject(e);
    }

    console.log(loginResponse);
    await User.setToken(loginResponse.response.access_token);
    return Promise.resolve(loginResponse);
  }

  public static async logout() {
    await User.deleteAll();
    LocalStorageService.remove(LocalStorageKeyNames.token);
    return Promise.resolve();
  }
}
