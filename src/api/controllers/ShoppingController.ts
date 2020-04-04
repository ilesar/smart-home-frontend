import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import ShoppingItem from '@/api/models/ShoppingItem';
import BaseController from '@/api/controllers/BaseController';

export default class ShoppingController extends BaseController {
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(ShoppingItem, ApiRoutes.getShoppingItems);
  }

  public static async fetchResolved() {
    return this.makeGetRequest(ShoppingItem, ApiRoutes.getResolvedShoppingItems);
  }

  public static async resolveShoppingItem(shoppingItem: ShoppingItem) {
    return this.makePatchRequest(ShoppingItem, `${ApiRoutes.patchShoppingItem}/${shoppingItem.id}`, {
      data: {
        id: shoppingItem.id.toString(),
        type: 'shopping_list_items',
        attributes: {
          isResolved: true,
        },
      },
    });
  }

  public static async addGroceryToShoppingList(groceryItem: GroceryItem, quantity: number): Promise<AxiosResponse | AxiosError> {

    return this.makePostRequest(GroceryItem, ApiRoutes.addGroceryToShoppingList, {
      data: {
        type: 'shopping_list_items',
        attributes: {
          quantity,
        },
        relationships: {
          groceryItem: {
            data: {
              type: 'grocery_items',
              id: groceryItem.id.toString(),
            },
          },
        },
      },
    });
  }

  public static async removeShoppingItemFromList(shoppingItem: ShoppingItem) {
    return this.makeDeleteRequest(ShoppingItem, `${ApiRoutes.deleteShoppingItem}/${shoppingItem.id}`);
  }
}
