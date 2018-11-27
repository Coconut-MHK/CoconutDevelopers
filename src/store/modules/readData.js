import firebase from 'firebase';
// import router from '../../routes/index';

const state = {
    placeData: [],
    doctorsData: []
}

const getters = {
    
}

const mutations = {
    setPlaceData(state, payload) {
        state.placeData = payload
    },
    setDoctorsData(state, payload) {
        state.doctorsData = payload
    }
}

const actions = {
    readPlaceData({ commit }, reference) {
        console.log(reference);
        commit('switchLoading', true, { root: true });
        firebase.database().ref(`/${reference}Information`)
            .once('value')
            .then((snapshot) => {
                const places = [];
                snapshot.forEach((childSnapshot) => {
                    const place = childSnapshot.val();
                    places.push(place);
                    console.log(place);
                });
                console.log(places);
                commit('setPlaceData', places);
                commit('switchLoading', false, { root: true });
            })
    },
    readDoctorsData({ commit }, placeId) {
        console.log(placeId);
        commit('switchLoading', true, { root: true });
        firebase.database().ref(`/doctors/${placeId}/`)
            .once('value')
            .then((snapshot) => {
                console.log(snapshot);
                const doctors = [];
                snapshot.forEach((childSnapshot) => {
                    const doctor = childSnapshot.val();
                    console.log(doctor);
                    doctors.push(doctor);
                });
                console.log(doctors);
                commit('setDoctorsData', doctors);
                commit('switchLoading', false, { root: true });

            })

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}