import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import Room from '@/api/models/Room';
import TokenRepository from '@/repositories/RoomRepository';

const getters: GetterTree<ILocalState, {}> = {
  getAllRooms(state) {
    return TokenRepository.getAll();
  },
  getRoomById: (state) => (roomSlug: string) => {
    console.log('CALLED: ', roomSlug);
    return Room
      .query()
      .where('slug', roomSlug)
      .first();
  },
};

export default getters;
