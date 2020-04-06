import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import GroceryItem from '@/api/models/GroceryItem';
import GroceryController from '@/api/controllers/GroceryController';
import RecurringPaymentsController from '@/api/controllers/RecurringPaymentsController';
import RecurringPayment from '@/api/models/RecurringPayment';


const actions: ActionTree<ILocalState, {}> = {
    async fetchRecurringPaymentList({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            RecurringPaymentsController.fetchAll().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));
    },
    async deleteRecurringPayment({commit, getters}, payment: RecurringPayment) {
        return new Promise<void>(((resolve, reject) => {
            RecurringPaymentsController.deleteOne(payment).then(() => {
            }).catch((error) => {
                reject(error);
            });
        }));


    },
    async createRecurringPayment({commit, getters}, payment: RecurringPayment) {

        return new Promise<void>(((resolve, reject) => {
            RecurringPaymentsController.createOne(payment).then(() => {
            }).catch((error) => {
                reject(error);
            });
        }));

    },
};

export default actions;
