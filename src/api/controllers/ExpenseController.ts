import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import BaseController from '@/api/controllers/BaseController';
import Room from '@/api/models/Room';
import Expense from '@/api/models/Expense';

export default class ExpenseController extends BaseController{
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(Expense, ApiRoutes.Expenses);
  }

  public static async fetchResolved(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(Expense, ApiRoutes.ResolvedExpenses);
  }

  public static resolveExpense(expense: Expense) {
    return this.makePatchRequest(Expense, `${ApiRoutes.Expense}/${expense.id}`, {
      data: {
        id: expense.id.toString(),
        type: 'expenses',
        attributes: {
          isResolved: true,
        },
      },
    });
  }
}
