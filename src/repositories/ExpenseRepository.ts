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
}
