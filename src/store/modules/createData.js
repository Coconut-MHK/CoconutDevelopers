import firebase from 'firebase';
import router from '../../routes/index';

const state = {
    dataProgress: {
        status: false,
        index: null
    },
    images: null,
    placeData: {},
    doctorsData: null,
    currentParam: null,
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
    centerTreatments: [
        '가족문제',
        '강박증',
        '공황장애',
        '과대망상',
        '낮은 자존감',
        '대인관계 문제',
        '부부 문제',
        '분노조절장애',
        '불안증',
        '삶의 전환기 문제',
        '섭식장애',
        '성격 문제',
        '성폭력 피해',
        '심리검사',
        '아동상담',
        '우울증',
        '의욕상실',
        '이성관계',
        '인터넷 중독',
        '지나친 걱정, 두려움',
        '진로 및 직장생활 스트레스',
        '학교폭력'
    ]
};

const getters = {
    header: state => {
        if (state.currentParam === 'hospital') {
           return "정신과 병원"
       } else if (state.currentParam === 'center') {
           return '심리상담센터'
       }
   },
   capitalizedParam: state => {
       return state.currentParam.charAt(0).toUpperCase() + state.currentParam.slice(1);
   },
   treatmentList: state => {
       return state.currentParam == 'hospital'
           ? state.hospitalTreatments
           : state.centerTreatments
   }
};

const mutations = {
    setPlaceData(state, payload) {
        state.placeData = {
            ...state.placeData,
            ...payload
        }
    },
    setDoctorsData(state, payload) {
        state.doctorsData = payload
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
    setCurrentParam(state, payload) {
        state.currentParam = payload
    },
    switchLoading({ rootState }, payload) {
        rootState.loading = payload;
    }
};

const actions = {
    createDoctorData(state, placeId) {
        const doctors = this.state.doctorsData;
        for (let doctor of doctors) {
            const ref = firebase.database().ref(`doctors/${placeId}/`).push();
            const doctorId = ref.key;
            ref.set({
                ...doctor,
                doctorId,
            })
        }
    },
    createPlaceData({ commit }, payload) {
        const { reference } = payload;
        const images = this.state.images;

        commit('switchLoading', true);
        const ref = firebase.database().ref(`${reference}Information/`).push();
        const placeId = ref.key;
        ref.set({
            ...this.state.placeData,
            placeId,
            images: ""
        })

        // Creating Doctor DB Information
        this.dispatch('createDoctorData', placeId)

        // Uploading Images to Place DB
        for (let item of images) {
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
                        commit('switchLoading', false);
                        router.push('/home/data/hopsital/')
                        
                    }
                })   
                .catch(error => console.log(error)) 
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}