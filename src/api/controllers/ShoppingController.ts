import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import ShoppingItem from '@/api/models/ShoppingItem';

export default class ShoppingController {
  public static async addGroceryToShoppingList(groceryItem: GroceryItem): Promise<AxiosResponse | AxiosError> {
    let groceries;

    const requestBody = {
      data: {
        type: 'shopping_list_items',
        attributes: {
          quantity: 1,
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
    };

    try {
      groceries = await GroceryItem.api().post(ApiRoutes.addGroceryToShoppingList, requestBody);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(groceries);
  }

  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    let shoppingItemResponse;

    try {
      shoppingItemResponse = await ShoppingItem.api().get(ApiRoutes.getShoppingItems);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(shoppingItemResponse);
  }
}
