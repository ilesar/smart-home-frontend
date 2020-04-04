import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';
import RecurringPayment from '@/api/models/RecurringPayment';

const getters: GetterTree<ILocalState, {}> = {
  getRecurringPaymentList(state) {
      return RecurringPayment
        .query()
        .orderBy('isAutomated', 'desc')
        .orderBy('paymentTag', 'desc')
        .all();
    },
  getRecurringPaymentsSum(state) {
    return RecurringPayment
      .query()
      .all()
      .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
        return aggregator + parseFloat(recurringPayment.price);
      }, 0).toFixed(2);
  },
};

export default getters;
