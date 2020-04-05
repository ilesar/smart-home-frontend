import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import RecurringItemController from '@/api/controllers/RecurringPaymentsController';
import RoomController from '@/api/controllers/RoomController';
import ExpenseController from '@/api/controllers/ExpenseController';
import ShoppingController from '@/api/controllers/ShoppingController';
import Expense from '@/api/models/Expense';


const actions: ActionTree<ILocalState, {}> = {
    async fetchExpenses({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            ExpenseController.fetchAll().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
    async fetchResolvedExpenses({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            ExpenseController.fetchResolved().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
    async resolveExpense({commit, getters, dispatch}, expense: Expense) {
        return new Promise<void>(((resolve, reject) => {
            ExpenseController.resolveExpense(expense).then(() => {
                dispatch('fetchExpenses');
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },
};

export default actions;
