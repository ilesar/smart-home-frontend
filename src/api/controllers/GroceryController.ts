import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import BaseController from '@/api/controllers/BaseController';

export default class GroceryController extends BaseController{
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(GroceryItem, ApiRoutes.getGroceryItemsWithImages);
  }

  public static deleteOne(groceryItem: GroceryItem) {
    return this.makeDeleteRequest(GroceryItem, `${ApiRoutes.patchGroceryItem}/${groceryItem.id}`);
  }
}
