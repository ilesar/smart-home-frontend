import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import RecurringPayment from '@/api/models/RecurringPayment';
import RecurringPaymentRepository from '@/repositories/RecurringPaymentRepository';

const getters: GetterTree<ILocalState, {}> = {
  getAllRecurringPaymentList(state) {
    return RecurringPaymentRepository.getAll();
  },
  getMonthlyRecurringPaymentList(state) {
    return RecurringPaymentRepository.getMonthly();
  },
  getYearlyRecurringPaymentList(state) {
    return RecurringPaymentRepository.getYearly();
  },
  getAllRecurringPaymentsSum(state) {
    return RecurringPaymentRepository.getAllPriceSum();
  },
  getMonthlyRecurringPaymentsSum(state) {
    return RecurringPaymentRepository.getMonthlyPriceSum();
  },
  getYearlyRecurringPaymentsSum(state) {
    return RecurringPaymentRepository.getYearlyPriceSum();
  },
};

export default getters;
