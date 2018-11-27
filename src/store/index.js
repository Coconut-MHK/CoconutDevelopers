import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import createData from './modules/createData';
import readData from './modules/readData';
import deleteData from './modules/deleteData';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        createData,
        readData,
        deleteData
    },
    state: {
        loading: false,
        currentParam: "",
    },
    getters: {
        header: state => {
            if (state.currentParam === 'hospital') {
               return "정신과 병원"
           } else if (state.currentParam === 'center') {
               return '심리상담센터'
           }
       },
       capitalizedParam: state => {
           return state ? state.currentParam.charAt(0).toUpperCase() + state.currentParam.slice(1) : '';
       },
    },
    mutations: {
        switchLoading(state, payload) {
            state.loading = payload
        },
        setCurrentParam(state, payload) {
            state.currentParam = payload
        }
    }
});

export default store;