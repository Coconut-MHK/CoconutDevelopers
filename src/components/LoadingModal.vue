<template>
  <transition name="modal">
    <div class="modal-backdrop" v-show="loading">
        <svg class="loading" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
            </path>
        </svg>
        <h4>로딩중..</h4>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Loading-Modal',
  computed: {
      ...mapState(['loading'])
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
</style>
