import {ApiRoutes} from '@/enums/ApiRoutes';
import Token from '@/api/models/Token';
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

    // debugger;
    // await groceries.save();

    return Promise.resolve(groceries);
  }
}
