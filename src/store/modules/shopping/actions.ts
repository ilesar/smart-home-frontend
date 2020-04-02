import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingController from '@/api/controllers/ShoppingController';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';


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
    fetchGroceryItemList({commit, getters}, productFormId) {
        GroceryController.fetchAll().then(() => {
        }).catch((error) => {
            console.error(error);
        });
    },
    addGroceryItemToShoppingList({commit, getters, dispatch}, groceryItem: GroceryItem) {
        return new Promise<void>(((resolve, reject) => {
            ShoppingController.addGroceryToShoppingList(groceryItem).then(() => {
                dispatch('fetchShoppingItemList');
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },

};

export default actions;
