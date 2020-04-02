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

  public static async fetchResolved() {
    let shoppingItemResponse;

    try {
      shoppingItemResponse = await ShoppingItem.api().get(ApiRoutes.getResolvedShoppingItems);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(shoppingItemResponse);
  }

  public static async resolveShoppingItem(shoppingItem: ShoppingItem) {
    let shoppingItemResponse;

    const requestBody = {
      data: {
        id: shoppingItem.id.toString(),
        type: 'shopping_list_items',
        attributes: {
          isResolved: true,
        },
      },
    };

    try {
      shoppingItemResponse = await ShoppingItem.api().patch(`${ApiRoutes.patchShoppingItem}/${shoppingItem.id}`, requestBody);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(shoppingItemResponse);
  }

  public static async removeShoppingItemFromList(shoppingItem: ShoppingItem) {
    let deleteItemResponse;

    try {
      // console.log(groceryItem);
      deleteItemResponse = await ShoppingItem.api().delete(`${ApiRoutes.deleteShoppingItem}/${shoppingItem.id}`);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(deleteItemResponse);
  }
}
