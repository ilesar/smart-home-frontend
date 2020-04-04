import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import RecurringItemController from '@/api/controllers/RecurringPaymentsController';


const actions: ActionTree<ILocalState, {}> = {
    async fetchRecurringPaymentList({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            RecurringItemController.fetchAll().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
};

export default actions;
