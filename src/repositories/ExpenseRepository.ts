import Room from '@/api/models/Room';
import Expense from '@/api/models/Expense';

export default class RoomRepository {
    public static getAll(): Room[] {
        return Expense
          .query()
          .with('recurringPayment')
          .orderBy('recurringPayment.isAutomated', 'desc')
          .orderBy('recurringPayment.paymentTag', 'desc')
          .all();
    }

  public static getResolved() {
    return Expense
      .query()
      .with('recurringPayment')
      .where('isResolved', true)
      .orderBy('recurringPayment.isAutomated', 'desc')
      .orderBy('recurringPayment.paymentTag', 'desc')
      .all();
  }

  public static getUnresolved() {
    return Expense
      .query()
      .with('recurringPayment')
      .where('isResolved', false)
      .orderBy('recurringPayment.isAutomated', 'desc')
      .orderBy('recurringPayment.paymentTag', 'desc')
      .all();
  }
}
