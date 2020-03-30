import { AxiosError, AxiosResponse } from 'axios';
import { ApiController } from '@/services/ApiController';
import { ApiRoutes } from '@/enums/ApiRoutes';

export default class TokenAPI {
  public static async refreshToken(): Promise<AxiosResponse | AxiosError> {
    let refreshedToken;

    try {
      refreshedToken = await ApiController.post(ApiRoutes.refreshToken, {});
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(refreshedToken);
  }
}
