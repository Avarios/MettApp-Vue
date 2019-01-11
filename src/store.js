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
    currentUser: state => {
      return state.user;
    },
    isAdmin:state => {
      return true;
    }
  },
  actions: {
    loginGoogle({ commit }) {
      auth().signInWithPopup(new googleProvider()).then(() => {
        commit('setAuthState', currentUser);
      }, err => {
        commit('setError', err);
      })
    },
    loginGithub({ commit }) {
      commit('setLoading');
      auth().signInWithPopup(new githubProvider()).then(() => {
        commit('setAuthState', currentUser);
      }, err => {
        commit('setError', err);
      })
    },
    login({ commit }, username, password) {
      commit('setLoading');
      auth().signInWithEmailAndPassword(username, password).then(() => {
        commit('setAuthState', currentUser);
      }, err => {
        commit('setError', err);
      })
    }
  }
})
