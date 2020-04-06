import {ActionTree} from 'vuex';
import ILocalState from './stateInterface';
import RecurringPaymentsController from '@/api/controllers/RecurringPaymentsController';
import RecurringPayment from '@/api/models/RecurringPayment';


const actions: ActionTree<ILocalState, {}> = {
  async fetchRecurringPaymentList({commit, getters}, productFormId) {
    RecurringPaymentsController.fetchAll().then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async createRecurringPayment({commit, getters}, payment: RecurringPayment) {
    RecurringPaymentsController.createOne(payment).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async updateRecurringPayment({commit, getters}, payment: RecurringPayment) {
    RecurringPaymentsController.updateOne(payment).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
  async deleteRecurringPayment({commit, getters}, payment: RecurringPayment) {
    RecurringPaymentsController.deleteOne(payment).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  },
};

export default actions;
