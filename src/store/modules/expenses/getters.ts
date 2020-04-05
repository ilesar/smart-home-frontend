import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import Room from '@/api/models/Room';
import TokenRepository from '@/repositories/RoomRepository';
import ExpenseRepository from '@/repositories/ExpenseRepository';
import Expense from '@/api/models/Expense';

const getters: GetterTree<ILocalState, {}> = {
  getAllExpenses(state) {
    return ExpenseRepository.getAll();
  },
  getResolvedExpenses(state) {
    return ExpenseRepository.getResolved();
  },
  getUnresolvedExpenses(state) {
    return ExpenseRepository.getUnresolved();
  },
  getUnresolvedExpensesSum(state) {
    return ExpenseRepository.getUnresolved().reduce((aggregator: number, expense: Expense) => {
      return aggregator + parseFloat(expense.recurringPayment.price);
    }, 0).toFixed(2);
  },
  getUnresolvedExpensesCount(state) {
    return ExpenseRepository.getUnresolved().length;
  },

};

export default getters;
