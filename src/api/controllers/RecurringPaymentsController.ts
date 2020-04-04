import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import BaseController from '@/api/controllers/BaseController';
import RecurringPayment from '@/api/models/RecurringPayment';

export default class RecurringPaymentsController extends BaseController {
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(RecurringPayment, ApiRoutes.getRecurringPayments);
  }
}
