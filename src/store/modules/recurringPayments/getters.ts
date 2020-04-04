import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import RecurringPayment from '@/api/models/RecurringPayment';

const getters: GetterTree<ILocalState, {}> = {
  getAllRecurringPaymentList(state) {
    return RecurringPayment
      .query()
      .orderBy('isAutomated', 'desc')
      .orderBy('paymentTag', 'desc')
      .all();
  },
  getMonthlyRecurringPaymentList(state) {
    return RecurringPayment
      .query()
      .where('period', 'month')
      .orderBy('isAutomated', 'desc')
      .orderBy('paymentTag', 'desc')
      .all();
  },
  getYearlyRecurringPaymentList(state) {
    return RecurringPayment
      .query()
      .where('period', 'year')
      .orderBy('isAutomated', 'desc')
      .orderBy('paymentTag', 'desc')
      .all();
  },
  getAllRecurringPaymentsSum(state) {
    return RecurringPayment
      .query()
      .all()
      .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
        return aggregator + parseFloat(recurringPayment.price);
      }, 0).toFixed(2);
  },
  getMonthlyRecurringPaymentsSum(state) {
    return RecurringPayment
      .query()
      .where('period', 'month')
      .all()
      .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
        return aggregator + parseFloat(recurringPayment.price);
      }, 0).toFixed(2);
  },
  getYearlyRecurringPaymentsSum(state) {
    return RecurringPayment
      .query()
      .where('period', 'year')
      .all()
      .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
        return aggregator + parseFloat(recurringPayment.price);
      }, 0).toFixed(2);
  },
};

export default getters;
