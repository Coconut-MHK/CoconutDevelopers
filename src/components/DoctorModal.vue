<template>
  <transition name="modal" v-if="!loading">
    <div class="modal-backdrop" v-show="isDisplayed">
        <div v-for="doctor in doctorsData" :key="doctor.index" class="doctor-information">
            <div class="doctor-information-col1">
                <h1 class="doctor-name">{{ doctor.name }}</h1>
                <small>{{ doctor.title }}</small>
                <p class="doctor-education" v-for="education in doctor.education" :key="education.index">
                    {{ education }}
                </p>
            </div>
            <div class="doctor-information-col2">
                <ul>
                    <small>관련 자격</small>
                    <li v-for="certificate in doctor.certificate" :key="certificate.index">{{ certificate }}</li>
                </ul>
                <ul>
                    <small>방송/미디어</small>
                    <li v-for="media in doctor.media" :key="media.index">{{ media }}</li>
                </ul>
            </div>
            <div class="doctor-information-col3">
                <ul>
                    <small>외부강연</small>
                    <li v-for="presentation in doctor.presentation" :key="presentation.index">{{ presentation }}</li>
                </ul>
                <ul>
                    <small>학회활동</small>
                    <li v-for="scholarRelated in doctor.scholarRelated" :key="scholarRelated.index">{{ scholarRelated }}</li>
                </ul>
            </div>
        </div>
        <button class="modal-backdrop-button box-shadow" @click="closeModal">닫기</button>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Doctor-Modal',
    props: {
        isDisplayed: Boolean,
        placeId: String
    },
    computed: {
        ...mapState('readData', ['doctorsData']),
        ...mapState(['loading'])
    },
    methods: {
        ...mapMutations('readData', ['setDoctorsData']),
        closeModal() {
            this.setDoctorsData([]);
            this.$emit('closeModal');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
.modal-backdrop {
  position: fixed;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-backdrop-button {
    border: none;
    color: white;
    background: $VueGreen;
    padding:  0.5rem 1rem;
    font-size: 0.7rem;
    margin-top: 1vh;
}
.loading {
    width: 60px;
    height: 60px;
}
.loading path {
    fill: white;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity .25s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.doctor-information {
    margin: 0.5vh 2vw;
    color: black;
    background: white;
    border-radius: 2px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    display: flex;
    width: 70%;
    .doctor-information-col1 {
        flex: 1;
        .doctor-name {
            margin-bottom: 1vh;
        }
        .doctor-education + .doctor-education {
            margin-top: 0;
        }
    }
    .doctor-information-col2 {
        flex: 1;
        small {
            font-weight: bold;
        }
    }
    .doctor-information-col3 {
        flex: 1;
        small {
            font-weight: bold;
        }
    }
    li {
        list-style: none;
    }
}
</style>
