import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import { auth } from './services/firebase.service';
Vue.config.productionTip = false

new Vue({
  store,
  created() {
    auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
  },
  render: h => h(App),
}).$mount('#app')
