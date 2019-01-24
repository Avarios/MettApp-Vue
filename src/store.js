import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import { auth, googleProvider, githubProvider, eventsCollection } from './services/firebase.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    error: null,
    user: null,
    isLoading: false,
    isAdmin:true
  },
  mutations: {
    setAuthState(state, payload) {
      if (payload) {
        state.user = payload;
        state.isLoading = false;
      }

    },
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, error) {
      state.error = error;
      state.isLoading = false;
    },
    logOut(state) {
      state.user = null;
      state.events = null;
    },
    setEventList(state, payload) {
      state.isLoading = false;
      state.events = payload;
    }
  },
  getters: {
    user: state => {
      if (state.user) {
        return {
          name: state.user.displayName,
          mail: state.user.email,
          photoUrl: state.user.photoURL,
          id: state.user.uid
        };
      }
      return null;
    },
    isAdmin: state => {
      return state.isAdmin;
    }
  },
  actions: {
    loginSocial({ commit }, provider) {
      commit('setLoading');
      switch (provider) {
        case 'google': {
          auth().signInWithPopup(new googleProvider()).then(() => {
            commit('setAuthState', auth().currentUser);
          }, err => {
            commit('setError', err);
          });
          break;
        }
        case 'github': {
          auth().signInWithPopup(new githubProvider()).then(() => {
            commit('setAuthState', auth().currentUser);
          }, err => {
            commit('setError', err);
          });
          break;
        }
        default: {
          commit('setError', 'no provider set !');
        }
      }
    },
    login({ commit }, username, password) {
      commit('setLoading');
      auth().signInWithEmailAndPassword(username, password).then(() => {
        commit('setAuthState', auth().currentUser);
      }, err => {
        commit('setError', err);
      })
    },
    autoSignIn({ commit }, payload) {
      commit('setAuthState', payload);
    },
    logOut({ commit }) {
      auth().signOut().then(() => {
        localStorage.removeItem('user');
        commit('logOut');
      })
    },
    loadEvents({ commit }) {
      commit('setLoading');
      eventsCollection.get().then(result => {
        let items = result.docs.map(item => item.data()).map((item) => {
          return {
            attendees: item.attendees,
            date: moment.unix(item.date.seconds).format('DD.MM.YYYY'),
            name: item.name,
            link: item.link,
            allowPaypal:item.allowPaypal
          }
        });
        commit('setEventList', items);
      });

    }
  }
})
