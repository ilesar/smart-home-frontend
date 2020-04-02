import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import ShoppingController from '@/api/controllers/ShoppingController';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryController from '@/api/controllers/GroceryController';
import GroceryItem from '@/api/models/GroceryItem';


const actions: ActionTree<ILocalState, {}> = {
    fetchShoppingItemList({commit, getters}, productFormId) {
        ShoppingController.fetchAll().then(() => {
        }).catch((error) => {
            console.error(error);
        });
        // commit('mutationCall', data);
    },
    fetchGroceryItemList({commit, getters}, productFormId) {
        GroceryController.fetchAll().then(() => {
        }).catch((error) => {
            console.error(error);
        });
    },
    addGroceryItemToShoppingList({commit, getters, dispatch}, groceryItem: GroceryItem) {
        ShoppingController.addGroceryToShoppingList(groceryItem).then(() => {
            dispatch('fetchShoppingItemList');
        }).catch((error) => {
            console.error(error)
        });
        // commit('mutationCall', data);
    },

};

export default actions;
