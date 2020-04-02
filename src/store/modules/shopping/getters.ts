import { GetterTree } from 'vuex';
import ILocalState from './stateInterface';

const getters: GetterTree<ILocalState, {}> = {
    sampleGetter(state) {
        // return state.productForms;
    },
    // sampleGetterWithParameter: (state) => (parameter: string) => {
    //
    // },
};

export default getters;
