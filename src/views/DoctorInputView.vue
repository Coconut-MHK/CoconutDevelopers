<template>
    <div class="doctorData-Container">
        <div class="FormContainer">
            <form @submit.prevent="addDoctorData">
                <fieldset class="InputContainer">
                    <legend><b>[ 의료진 정보 ]</b></legend>
                    <div class="InputWrapper">
                        <label for="name">이름</label>
                        <input type="text" id="name" v-model.lazy="doctorInput.name">
                        <label for="title">직책</label>
                        <input type="text" id="title" v-model.lazy="doctorInput.title">
                        <label for="education">학력</label>
                        <input type="text" id="education" v-model.lazy="doctorInput.education">
                        <label for="certificate">관련 자격</label>
                        <input type="text" id="certificate" v-model.lazy="doctorInput.certificate">
                        <label for="media">방송 / 미디어 경력</label>
                        <input type="text" id="media" v-model.lazy="doctorInput.media">
                        <label for="presentation">외부강연 경험</label>
                        <input type="text" id="presentation" v-model.lazy="doctorInput.presentation">
                        <label for="scholarRelated">학회활동</label>
                        <input type="text" id="scholarRelated" v-model.lazy="doctorInput.scholarRelated">
                    </div>
                    <input type="submit" value="등록">
                </fieldset>
            </form>
        </div>
        <div class="DisplayContainer">
            <div v-for="doctor in doctorData" :key="doctor.index" class="doctor-information">
                <div class="doctor-information-col1">
                    <h1>{{ doctor.name }}</h1>
                    <small>{{ doctor.title }}</small>
                    <p v-for="education in doctor.education" :key="education.index">
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
            <button @click="showModal"></button>
        </div>
        <confirm-modal :displayCondition="displayModal"></confirm-modal>
    </div>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue';
export default {
    data() {
        return {
            doctorInput: {
                name: "",
                title: "",
                education: "",
                certificate: "",
                media: "",
                presentation: "",
                scholarRelated: ""
            },
            doctorData: [],
            displayModal: false
        }
    },
    components: {
        ConfirmModal
    },
    computed: {
        educationArr() {
            return this.doctorInput.education.split(', ')
        },
        certificateArr() {
            return this.doctorInput.certificate.split(', ')
        },
        mediaArr() {
            return this.doctorInput.media.split(', ')
        },
        presentationArr() {
            return this.doctorInput.presentation.split(', ')
        },
        scholarRelatedArr() {
            return this.doctorInput.scholarRelated.split(', ')
        }
    },
    methods: {
        addDoctorData() {
            this.doctorData.push({
                ...this.doctorInput,
                education: this.educationArr,
                certificate: this.certificateArr,
                media: this.mediaArr,
                presentation: this.presentationArr,
                scholarRelated: this.scholarRelatedArr
            });
            this.doctorInput = {
                name: "",
                title: "",
                education: "",
                certificate: "",
                media: "",
                presentation: "",
                scholarRelated: ""
            };
        },
        showModal() {
            this.displayModal = !this.displayModal;
        },
        sendDataToStore() {

        }
    }
}
</script>

<style lang="scss" scoped>
    .doctorData-Container {
        width: 100vw;
        display: flex;
        .FormContainer {
            flex: 1 1 30%;
            display: flex;
            justify-content: center;
            .InputContainer {
                width: 15vw;
                border: none;
                border-radius: 2px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                .InputWrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    input {
                        width: 100%;
                        height: 3vh;
                        margin-bottom: 1vh;
                    }
                }
            }
        }
        .DisplayContainer {
            flex: 1 1 70%;
            .doctor-information {
                margin: 1vh 7vw 0 7vw;
                border-radius: 2px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                display: flex;
                .doctor-information-col1 {
                    flex: 1
                }
                .doctor-information-col2 {
                    flex: 1
                }
                .doctor-information-col3 {
                    flex: 1
                }
                li {
                    list-style: none;
                }
            }
            .doctor-information + .doctor-information {
                margin-top: 5vh;
            }
        }
    }
</style>

