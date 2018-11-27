import firebase from 'firebase';
import router from '../../routes/index';

const state = {
    developersUid: [
        "ceBfWa2rMfgEf8u7jeo84FEeNdH3",
        "qn6kO7Rm62RInzssz8UPSOvMgoJ2"
    ],
    logged: false,
    error: null,
    user: null,
};

const getters = {
    getUser: state => state.user
};

const mutations = {
    setLogged(state, payload) {
        state.logged = payload
    },
    setUser(state, payload) {
        state.user = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    addDeveloper(state, payload) {
        state.developersUid.push(payload)
    }
};

const actions = {
    userSignIn({ commit, state }, payload) {
        commit('switchLoading', true, { root: true });
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
            if (state.developersUid.includes(user.uid)) {
                commit('setUser', {
                    ...user
                })
                commit('setLogged', true)
                commit('setError', null)
                commit('switchLoading', false, { root: true});
                router.push('/home')
            } else {
                commit('switchLoading', false, { root: true });
                commit('setError', "You are not a Coconut Developer!")
            }
        })
        .catch(error => {
            commit('setError', error.message)
        })
    },
    userSignOut({ commit }) {
        router.push('/login')
        firebase.auth().signOut()
        commit('setLogged', false)
        commit('setUser', null)
    },
    userAutoSignIn({ commit }, payload) {
        commit('switchLoading', true, { root: true });
        commit('setUser', {
            ...payload
        })
        commit('setLogged', true)
        commit('switchLoading', false, { root: true });
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}