import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';

export default class GroceryController {
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    let groceries;

    try {
      groceries = await GroceryItem.api().get(ApiRoutes.getGroceryItems, {
        save: true,
      });
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(groceries);
  }
}
