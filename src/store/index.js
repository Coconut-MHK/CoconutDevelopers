import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../routes/index';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        developersUid: [
            "ceBfWa2rMfgEf8u7jeo84FEeNdH3",
            "qn6kO7Rm62RInzssz8UPSOvMgoJ2"
        ],
        logged: false,
        loading: false,
        dataProgress: {
            status: false,
            index: null
        },
        error: null,
        user: null,
        images: null,
        hospitalData: null,
        hospitalTreatments: [
            '공황장애', 
            '니코딘중독', 
            '만성피로증후군', 
            '불안장애',
            '섭식장애(과식증, 식욕부진증)', 
            '수면장애(불면증)', 
            '수험생 증후군',
            '알코올중독', 
            '외상후스트레스장애(PTSD)', 
            '우울증', 
            '의처증/의부증',
            '조울증', 
            '조현병(정신분열증)', 
            '주의력결핍 과잉행동 장애(ADHD)',
            '집중틱장애', 
            '치매'
        ],
    },
    getters: {
        getUser: state => state.user
    },
    // 비동기 처리 후 받는 값으로 하는 state 변경 로직
    mutations: {
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
        setHospitalData(state, payload) {
            state.hospitalData = {
                ...state.hospitalData,
                ...payload
            }
        },
        setImages(state, payload) {
            state.images = payload
        },
        setDataProgress(state, payload) {
            state.dataProgress = {
                ...state.dataProgress,
                ...payload
            }
        },
        addDeveloper(state, payload) {
            state.developersUid.push(payload)
        }
    },
    // 비동기 처리
    actions: {
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
        createPlaceData({ commit }, payload) {
            const { reference, data } = payload;
            const images = this.state.images;
            
            commit('setLoading', true);
            const ref = firebase.database().ref(`${reference}Information/`).push();
            const placeId = ref.key;
            ref.set({
                ...data,
                placeId,
                images: ""
            })
            for (const item of images) {
                const itemIndex = images.indexOf(item).toString();
                firebase.storage().ref(`/${reference}/${placeId}`).put(item)
                    .then(response => {
                        return response.ref.getDownloadURL()
                    })
                    .then(url => {
                        firebase.database().ref(`${reference}Information/${placeId}/images`).update({
                            [itemIndex]: url
                        })
                    })
                    .then(() => {
                        if (itemIndex == images.length - 1) {
                            commit('setImages', []);
                            commit('setLoading', false);
                        }
                    })   
                    .catch(error => console.log(error)) 
            }
        }
    }
})