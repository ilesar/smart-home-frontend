import { ActionTree } from 'vuex';
import ILocalState from './stateInterface';


const actions: ActionTree<ILocalState, {}> = {
    async sample({commit, getters}, productFormId) {
        // commit('mutationCall', data);
    },
};

export default actions;
