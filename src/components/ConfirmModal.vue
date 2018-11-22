<template>
  <transition name="modal">
    <div class="modal-backdrop" v-show="displayCondition">
        <h1>병원 정보</h1>
        <p>{{ this.hospitalData }}</p>
        <div v-for="doctor of doctorsData" :key="doctor.index">
          <h2>의료진</h2>
          <!-- ACESS THE INDEX OF EACH V-FOR AND PRINT IT ON h2 -->
          <p>{{ doctor.name }}</p>
          <small>{{ doctor.title }}</small>
          <dl>
            <dt>학력</dt>
            <dd v-for="education of doctor.education" :key="education.index">{{ education }}</dd>
            <dt>자격</dt>
            <dd v-for="certificate of doctor.certificate" :key="certificate.index">{{ certificate }}</dd>
            <dt>방송 및 미디어</dt>
            <dd v-for="media of doctor.media" :key="media.index">{{ media }}</dd>
            <dt>외부강연</dt>
            <dd v-for="presentation of doctor.presentation" :key="presentation.index">{{ presentation }}</dd>
            <dt>학술활동</dt>
            <dd v-for="scholarRelated of doctor.scholarRelated" :key="scholarRelated.index">{{ scholarRelated }}</dd>
          </dl>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['displayCondition'],
    computed: {
      ...mapState(['hospitalData', 'doctorsData']),
      confirm() {
          return this.$store.state.loading
      }
    }
}
</script>

<style>
.modal-backdrop {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  background: white;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity .25s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
