import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { auth } from './services/firebase.service';
Vue.config.productionTip = false;
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'


Vue.use(VueMaterial);

new Vue({
  store,
  created() {
    auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('firebaseInit', firebaseUser);
      }
    })
  },
  render: h => h(App),
}).$mount('#app');
