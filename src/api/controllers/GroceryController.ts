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

  public static createOne(groceryItem: GroceryItem) {
    return this.makePostRequest(GroceryItem, `${ApiRoutes.createGroceryItem}`, {
      data: {
        type: 'grocery_items',
        attributes: {
          name: groceryItem.name,
          price: groceryItem.price,
          source: 'manual',
        },
      },
    });
  }

  public static updateOne(groceryItem: GroceryItem) {
    return this.makePatchRequest(GroceryItem, `${ApiRoutes.createGroceryItem}/${groceryItem.id}`, {
      data: {
        id: groceryItem.id,
        type: 'grocery_items',
        attributes: {
          name: groceryItem.name,
          price: groceryItem.price,
          source: 'manual',
        },
      },
    });
  }
}
