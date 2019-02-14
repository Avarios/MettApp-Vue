import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import { auth, googleProvider, githubProvider, eventsCollection, db } from './services/firebase.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    error: null,
    user: null,
    isLoading: false,
    isAdmin: true
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
    },
    addEvent(state, payload) {
      let newEvent = {
        ...payload,
        host: db.doc(`/user/${state.user.uid}`)
      }
      eventsCollection.add(newEvent);
    },
    deleteEvent(state, payload) {
      state.isLoading = true;
      eventsCollection.doc(payload).delete().then(() => {
        state.isLoading = false;
      }, () => {
        state.isLoading =false;
      });
    }
  },
  getters: {
    user: state => {
      if (state.user) {
        return {
          name: state.user.displayName,
          mail: state.user.email,
          photoUrl: state.user.photoURL,
          id: state.user.uid,
          isAdmin: state.isAdmin,

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
    addEvent({ commit }, payload) {
      commit('addEvent', payload);
    },
    deleteEvent({ commit }, payload) {
      commit('deleteEvent', payload);
    },
    firebaseInit({ commit }, payload) {
      commit('setAuthState', payload);

      eventsCollection.onSnapshot(snap => {
        let events = mapEventData(snap.docs);
        commit('setEventList', events);
      })
    },
    logOut({ commit }) {
      auth().signOut().then(() => {
        localStorage.removeItem('user');
        commit('logOut');
      })
    }
  }
})

const mapEventData = (docs) => {
  return docs.map(result => {
    var item = result.data();
    var event = {
      id: result.id,
      attendees: item.attendees,
      date: moment.unix(item.eventDate.seconds).format('DD.MM.YYYY'),
      name: item.hoster,
      link: item.link,
      allowPaypal: item.allowPaypal,
      host: item.host
    };
    return event;
  })
}
