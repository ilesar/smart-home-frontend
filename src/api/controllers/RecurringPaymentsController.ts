import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import BaseController from '@/api/controllers/BaseController';
import RecurringPayment from '@/api/models/RecurringPayment';
import GroceryItem from '@/api/models/GroceryItem';

export default class RecurringPaymentsController extends BaseController {
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(RecurringPayment, ApiRoutes.RecurringPayments);
  }

  public static deleteOne(payment: RecurringPayment) {
    return this.makeDeleteRequest(RecurringPayment, `${ApiRoutes.RecurringPayment}/${payment.id}`);
  }

  public static createOne(payment: RecurringPayment) {
    console.log(payment);
    return this.makePostRequest(RecurringPayment, ApiRoutes.RecurringPayment, {
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

  public static updateOne(payment: RecurringPayment) {
    console.log('patchings')
    return this.makePatchRequest(RecurringPayment, `${ApiRoutes.RecurringPayment}/${payment.id}`, {
      data: {
        id: payment.id,
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

