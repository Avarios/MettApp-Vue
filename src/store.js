import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider, githubProvider, currentUser } from './services/firebase.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    error: null,
    user: null,
    isLoading: false
  },
  mutations: {
    setAuthState(state, payload) {
      state.user = payload;
      state.isLoading = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, error) {
      state.error = error;
      state.isLoading = false;
    }
  },
  getters: {
    user: state => {
      state.user = currentUser;
      return state.user;
    },
    isAdmin:state => {
      return true;
    }
  },
  actions: {
    loginSocial({ commit }, provider) {
      commit('setLoading');
      switch(provider) {
        case 'google': {
          auth().signInWithPopup(new googleProvider()).then(() => {
            commit('setAuthState', currentUser);
          }, err => {
            commit('setError', err);
          });
          break;
        }
        case 'github': {
          auth().signInWithPopup(new githubProvider()).then(() => {
            commit('setAuthState', currentUser);
          }, err => {
            commit('setError', err);
          });
          break;
        }
        default: {
          commit('setError','no provider set !');
        }
      }
    },
    login({ commit }, username, password) {
      commit('setLoading');
      auth().signInWithEmailAndPassword(username, password).then(() => {
        commit('setAuthState', currentUser);
      }, err => {
        commit('setError', err);
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setAuthState', payload);
     }
  }
})
