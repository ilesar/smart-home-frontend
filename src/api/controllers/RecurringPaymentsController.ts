import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import BaseController from '@/api/controllers/BaseController';
import RecurringPayment from '@/api/models/RecurringPayment';
import GroceryItem from '@/api/models/GroceryItem';

export default class RecurringPaymentsController extends BaseController {
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(RecurringPayment, ApiRoutes.getRecurringPayments);
  }

  public static deleteOne(payment: RecurringPayment) {
    return this.makeDeleteRequest(RecurringPayment, `${ApiRoutes.deleteRecurringPayment}/${payment.id}`);
  }

  public static createOne(payment: RecurringPayment) {
    console.log('inside', payment);
    return this.makePostRequest(RecurringPayment, ApiRoutes.createRecurringPayment, {
      data: {
        type: 'recurring_payments',
        attributes: {
          name: payment.name,
          price: payment.price,
          period: payment.period,
          activationTime: payment.activationTime,
          paymentTag: payment.paymentTag,
          isAutomated: payment.isAutomated,
        },
      },
    });
  }
}

