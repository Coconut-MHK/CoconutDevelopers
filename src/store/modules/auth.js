import firebase from 'firebase';
import router from '../routes/index';

const state = {
    developersUid: [
        "ceBfWa2rMfgEf8u7jeo84FEeNdH3",
        "qn6kO7Rm62RInzssz8UPSOvMgoJ2"
    ],
    logged: false,
    loading: false,
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
    setLoading(state) {
        state.loading = !state.loading
    },
    addDeveloper(state, payload) {
        state.developersUid.push(payload)
    }
};

const actions = {
    userSignIn({ commit }, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
            if (this.state.developersUid.includes(user.uid)) {
                commit('setUser', {
                    ...user
                })
                commit('setLogged', true)
                commit('setError', null)
                router.push('/home')
            } else {
                commit('setError', "You are not a Coconut Developer!")
            }
        })
        .catch(error => {
            commit('setError', error.message)
        })
    },
    userSignOut({ commit }) {
        firebase.auth().signOut()
        commit('setUser', null)
        commit('setLogged', false)
        router.push('/')
    },
    userAutoSignIn({ commit }, payload) {
        commit('setUser', {
            ...payload
        })
        commit('setLogged', true)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}