import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import createData from './modules/createData';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        createData
    },
    state: {
        loading: false
    },
    mutations: {
        switchLoading(state, payload) {
            state.loading = payload
        }
    }
});

export default store;