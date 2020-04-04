import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import Room from '@/api/models/Room';
import TokenRepository from '@/repositories/RoomRepository';
import ExpenseRepository from '@/repositories/ExpenseRepository';

const getters: GetterTree<ILocalState, {}> = {
  getAllExpenses(state) {
    return ExpenseRepository.getAll();
  },
};

export default getters;
