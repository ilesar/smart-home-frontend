import {ActionTree} from 'vuex';
import ILocalState from './stateInterface';
import RecurringPaymentsController from '@/api/controllers/RecurringPaymentsController';
import RecurringPayment from '@/api/models/RecurringPayment';


const actions: ActionTree<ILocalState, {}> = {
  async fetchRecurringPaymentList({commit, getters}, productFormId) {
    return RecurringPaymentsController.fetchAll();
  },
  async createRecurringPayment({commit, getters}, payment: RecurringPayment) {
    return RecurringPaymentsController.createOne(payment);
  },
  async updateRecurringPayment({commit, getters}, payment: RecurringPayment) {
    return RecurringPaymentsController.updateOne(payment);
  },
  async deleteRecurringPayment({commit, getters}, payment: RecurringPayment) {
    return RecurringPaymentsController.deleteOne(payment);
  },
};

export default actions;
