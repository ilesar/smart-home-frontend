import { AxiosError, AxiosResponse } from 'axios';
import { ApiController } from '@/services/ApiController';
import { ApiRoutes } from '@/enums/ApiRoutes';

export default class GroceryAPI {
  public static async getAllItems(): Promise<AxiosResponse | AxiosError> {
    let refreshedToken;

    try {
      refreshedToken = await ApiController.get(ApiRoutes.getGroceryItems);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(refreshedToken);
  }
}
