import Token from '@/api/models/Token';
import Room from '@/api/models/Room';

export default class RoomRepository {
    public static getAll(): Room[] {
        return Room
          .query()
          .with('devices')
          .all();
    }
}
