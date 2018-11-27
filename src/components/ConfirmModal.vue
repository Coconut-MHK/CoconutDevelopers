<template>
  <transition name="modal">
    <div class="modal-backdrop" v-if="isDisplayed">
        <div class="modal-container box-shadow">
            <h2>해당 데이터를 지우시겠습니까?</h2>
            <div>
                <button @click="deleteData" class="modal-backdrop-button box-shadow">확인</button>
                <button @click="closeModal" class="modal-backdrop-button box-shadow">취소</button>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        isDisplayed: Boolean,
        placeId: String,
    },
    data() {
        return {
            param: this.$route.params.place
        }
    },
    computed: {
        ...mapState(['currentParam'])
    },
    watch: {
        currentParam(value) {
            this.param = this.currentParam;
        }
    },
    methods: {
        ...mapActions('deleteData', ['deletePlaceAndDoctorData']),
        deleteData() {
            this.deletePlaceAndDoctorData(this.param, this.placeId)
        },
        closeModal() {
            this.$emit('closeModal');
        }
    },
    mounted() {
        console.log(this.param);
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
.modal-backdrop {
  position: fixed;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .modal-container {
      color: black;
      background: white;
      padding: 2vh 5vw;
      border-radius: 2px;
  }
}
.modal-backdrop-button {
    border: none;
    color: white;
    background: $VueGreen;
    padding:  0.5rem 1rem;
    font-size: 0.7rem;
    margin-top: 1vh;
}
.modal-backdrop-button + .modal-backdrop-button {
    margin-left: 2vw;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .25s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
