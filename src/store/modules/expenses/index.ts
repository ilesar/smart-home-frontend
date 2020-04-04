import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import ILocalState from './stateInterface';

const initState: ILocalState = {
    productForms: '',
    activeProductForms: '',
};

export default {
    namespaced: true,
    state: initState,
    getters,
    actions,
    mutations,
};
