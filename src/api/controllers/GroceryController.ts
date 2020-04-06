import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import BaseController from '@/api/controllers/BaseController';
import type = Mocha.utils.type;

export default class GroceryController extends BaseController{
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(GroceryItem, ApiRoutes.GroceryItems);
  }

  public static deleteOne(groceryItem: GroceryItem) {
    return this.makeDeleteRequest(GroceryItem, `${ApiRoutes.GroceryItem}/${groceryItem.id}`);
  }

  public static createOne(groceryItem: GroceryItem) {
    return this.makePostRequest(GroceryItem, `${ApiRoutes.GroceryItem}`, {
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
    return this.makePatchRequest(GroceryItem, `${ApiRoutes.GroceryItem}/${groceryItem.id}`, {
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
