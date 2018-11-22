<template>
  <transition name="modal">
    <div class="modal-backdrop" v-show="displayCondition">
        <h1>병원 정보</h1>
    </div>
  </transition>
</template>

<script>
export default {
    props: ['displayCondition'],
    computed: {
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
