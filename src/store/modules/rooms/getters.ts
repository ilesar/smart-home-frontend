import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import Room from '@/api/models/Room';
import RoomRepository from '@/repositories/RoomRepository';

const getters: GetterTree<ILocalState, {}> = {
  getAllRooms(state) {
    return RoomRepository.getAll();
  },
  getRoomById: (state) => (roomSlug: string) => {
    return Room
      .query()
      .withAllRecursive()
      .orderBy('devices.configuration', 'desc')
      .where('slug', roomSlug)
      .first();
  },
};

export default getters;
