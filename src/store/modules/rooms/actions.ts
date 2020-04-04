import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';
import RecurringItemController from '@/api/controllers/RecurringPaymentsController';
import RoomController from '@/api/controllers/RoomController';


const actions: ActionTree<ILocalState, {}> = {
    async fetchRooms({commit, getters}, productFormId) {
        return new Promise<void>(((resolve, reject) => {
            RoomController.fetchAll().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }));

    },
};

export default actions;
