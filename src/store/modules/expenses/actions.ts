import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import RecurringItemController from '@/api/controllers/RecurringPaymentsController';
import RoomController from '@/api/controllers/RoomController';
import ExpenseController from '@/api/controllers/ExpenseController';


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
};

export default actions;
