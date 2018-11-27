<template>
    <div>
        <div class="data-list">
            <div 
            class="data-list-item"
            v-for="place of placeData"
            :id="place.placeId"
            :key="place.index"
            >
                <div class="data-list-item-header">
                    <h3 class="header">{{ place.name }}</h3>
                    <button @click="select($event, 'doctor')" class="item-button edit-button">의료진 정보</button>
                    <button @click="select($event, 'edit')" class="item-button edit-button">수정</button>
                    <button @click="select($event, 'delete')" class="item-button delete-button">삭제</button>
                </div>
                <p>{{ place.description }}</p>
                <small><b>주소:</b> {{ place.address }}</small><br>
                <small><b>영업시간:</b> {{ place.operatingHours }}</small><br>
                <small><b>연락처:</b> {{ place.contacts }}</small><br>
                <small><b>웹사이트:</b> {{ place.websiteUrl }}</small><br>
                <p>진료항목: </p>
            </div>
        </div>
        <doctor-modal 
            :isDisplayed="displayDoctorModal"
            :placeId="placeId"
            @closeModal="displayDoctorModal = !displayDoctorModal"
        ></doctor-modal>
        <confirm-modal
            :isDisplayed="displayConfirmModal"
            :placeId="placeId"
            @closeModal="displayConfirmModal = !displayConfirmModal"
        ></confirm-modal>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import DoctorModal from '../components/DoctorModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
export default {
    components: {
        DoctorModal,
        ConfirmModal
    },
    data() {
        return {
            displayDoctorModal: false,
            displayConfirmModal: false,
            placeId: ""
        }
    },
    computed: {
        ...mapState(['currentParam']),
        ...mapState('readData', ['placeData'])
    },
    methods: {
        ...mapMutations(['setCurrentParam']),
        ...mapActions('readData', ['readPlaceData', 'readDoctorsData']),
        select(e, direction) {
            // Set Place Id of the parent div
            this.placeId = e.path[2].id;
            console.log(this.placeId);
            if (direction === 'doctor') {
                this.readDoctorsData(this.placeId).then(() => {
                    this.displayDoctorModal = true;
                });
            } else if (direction === 'edit') {
                console.log(direction);
            } else if (direction === 'delete') {
                this.displayConfirmModal = true;
            }
        },
    },
    watch: {
        currentParam(value) {
            this.readPlaceData(value);
            this.setCurrentParam(this.$route.params.place)
        }
    },
    created() {
        // Reset Vuex Store Methods should go here!!
        this.readPlaceData(this.currentParam);
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
.data-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90vw;
    .data-list-item {
        width: 40vw;
        min-width: 400px;
        margin-bottom: 5vh;
        text-align: left;   
        padding: 0 1vw;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        &:hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }   
        .data-list-item-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            .header {
                flex: 1 1 50%;
            }
            .item-button {
                cursor: pointer;
                border-radius: 2px;
                font-size: 0.7rem;
                border: none;
                padding: 0.5rem 1rem;
                color: white;
            }
            .item-button + .item-button {
                margin-left: 0.5rem;
            }
            .edit-button {
                background: $VueGreen;
            }
            .delete-button {
                background: #DF2800;
            }
        }
    }
}
</style>
