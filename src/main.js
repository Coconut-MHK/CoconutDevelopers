import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/index'
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBz5qFakcahaCIdkR1XbDemZEJc37-l7vs",
    authDomain: "days-fd14f.firebaseapp.com",
    databaseURL: "https://days-fd14f.firebaseio.com",
    projectId: "days-fd14f",
    storageBucket: "days-fd14f.appspot.com",
    messagingSenderId: "209011208541"
};

firebase.initializeApp(config);

Vue.config.productionTip = false

const unsubscribe = firebase.auth()
.onAuthStateChanged(user => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (user) {
        store.dispatch('auth/userAutoSignIn', user)
      }
    }
  })
  unsubscribe()
})