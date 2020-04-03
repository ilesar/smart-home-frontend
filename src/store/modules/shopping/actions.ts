import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingController from '@/api/controllers/ShoppingController';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';
import ShoppingItem from '@/api/models/ShoppingItem';


const actions: ActionTree<ILocalState, {}> = {
    async fetchShoppingItemList({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.fetchAll().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
    async fetchResolvedItemList({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.fetchResolved().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
    async fetchGroceryItemList({commit, getters}, productFormId) {
        GroceryController.fetchAll().then(() => {
        }).catch((error) => {
            console.error(error);
        });
    },
    async addGroceryItemToShoppingList({commit, getters, dispatch}, groceryItem: any) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.addGroceryToShoppingList(groceryItem.item, groceryItem.quantity).then(() => {
                dispatch('fetchShoppingItemList');
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },
    async resolveShoppingItem({commit, getters, dispatch}, shoppingItem: ShoppingItem) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.resolveShoppingItem(shoppingItem).then(() => {
                dispatch('fetchShoppingItemList');
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },
    async removeShoppingItem({commit, getters, dispatch}, shoppingItem: ShoppingItem) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.removeShoppingItemFromList(shoppingItem).then(() => {
                dispatch('fetchShoppingItemList');
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },
};

export default actions;
