import Room from '@/api/models/Room';
import Expense from '@/api/models/Expense';

export default class RoomRepository {
    public static getAll(): Expense[] {
        return Expense
          .query()
          .with('recurringPayment')
          .orderBy('recurringPayment.isAutomated', 'desc')
          .orderBy('recurringPayment.paymentTag', 'desc')
          .all();
    }

  public static getResolved(): Expense[] {
    return Expense
      .query()
      .with('recurringPayment')
      .where('isResolved', true)
      .orderBy('recurringPayment.isAutomated', 'desc')
      .orderBy('recurringPayment.paymentTag', 'desc')
      .all();
  }

  public static getUnresolved(): Expense[] {
    return Expense
      .query()
      .with('recurringPayment')
      .where('isResolved', false)
      .orderBy('dueDate', 'asc')
      .orderBy('recurringPayment.isAutomated', 'desc')
      .orderBy('recurringPayment.paymentTag', 'desc')
      .all();
  }
}
