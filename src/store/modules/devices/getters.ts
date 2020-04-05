import {GetterTree} from 'vuex';
import ILocalState from './stateInterface';
import Room from '@/api/models/Room';
import RoomRepository from '@/repositories/RoomRepository';
import Device from '@/api/models/Device';

const getters: GetterTree<ILocalState, {}> = {
  getDeviceById: (state) => (roomSlug: string) => {
    return Device
      .query()
      .where('slug', roomSlug)
      .first();
  },
};

export default getters;
