import Token from '@/api/models/Token';
import RecurringPayment from '@/api/models/RecurringPayment';

export default class RecurringPaymentRepository {
    public static getAll(): RecurringPayment[] {
        return RecurringPayment
          .query()
          .orderBy('isAutomated', 'desc')
          .orderBy('paymentTag', 'desc')
          .all();
    }
    public static getMonthly(): RecurringPayment[] {
        return RecurringPayment
          .query()
          .where('period', 'month')
          .orderBy('isAutomated', 'desc')
          .orderBy('paymentTag', 'desc')
          .all();
    }
    public static getYearly(): RecurringPayment[] {
        return RecurringPayment
          .query()
          .where('period', 'year')
          .orderBy('isAutomated', 'desc')
          .orderBy('paymentTag', 'desc')
          .all();
    }
    public static getAllPriceSum(): string {
        return RecurringPayment
          .query()
          .all()
          .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
              return aggregator + parseFloat(recurringPayment.price);
          }, 0).toFixed(2);
    }
    public static getMonthlyPriceSum(): string {
        return RecurringPayment
          .query()
          .where('period', 'month')
          .all()
          .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
              return aggregator + parseFloat(recurringPayment.price);
          }, 0).toFixed(2);
    }
    public static getYearlyPriceSum(): string {
        return RecurringPayment
          .query()
          .where('period', 'year')
          .all()
          .reduce((aggregator: number, recurringPayment: RecurringPayment) => {
              return aggregator + parseFloat(recurringPayment.price);
          }, 0).toFixed(2);
    }
}
