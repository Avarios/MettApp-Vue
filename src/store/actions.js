
import { auth, googleProvider, githubProvider, db } from '../services/firebase.service';
import moment from 'moment';

const actions = {
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
    subscribe({commit}, payload) {
      
    },
    setUserData({commit}, payload) {
      db.collection('user').doc(payload.uid).get().then(result => {
        if(result.exists){
          db.collection('user').doc(payload.uid).update({
            tenant: payload.tenant
          }).then(res => {
            commit('setUserData', payload);
          })
        } else {
          db.collection('user').doc(payload.uid).set({tenant: payload.tenant}).then(res => {
            commit('setUserData', payload);
          })
        }
        db.collection('events').doc(payload.tenant).collection('events').onSnapshot(snap => {
          let items = mapEventData(snap.docs);
          commit('setEventList', items);
        });
      });
      
    },
    addEvent({ commit }, payload) {
      const { id,tenant,...eventData } = payload;
      let newEvent = {
        ...eventData,
        host: db.collection('user').doc(id)
      };
      db.collection('events').doc(tenant).collection('events').add(newEvent).then(result => {
        commit('addEvent', payload);
      });  
    },
    deleteEvent({ commit }, payload) {
      commit('deleteEvent', payload);
    },
    firebaseInit({ commit }, payload) {
      
      db.collection('tenants').get().then(results => {
        let tenants = results.docs.map(item => {
          return {"key": item.id , "value":item.data().name}
        });
        commit('setTenantList',tenants);
      }, err => {
        console.error(err);
      });
      db.collection('user').doc(payload.uid).get().then(result => {
        let user = {...payload};
        if(result.exists) {
          if(result.data().isAdmin){
            commit('setAdmin');
          }
          if(result.data().tenant) {
            user.tenant = result.data().tenant;
          }
        }
        if (!result.exists || !result.data().tenant) {
          commit('setShowTenantDialog');
        } 
        if(result.exists && result.data().tenant) {
          db.collection('events').doc(result.data().tenant).collection('events').onSnapshot(snap => {
            let items = mapEventData(snap.docs);
            commit('setEventList', items);
          });
        }
        commit('setAuthState', user)
      }, err => {
        console.error(err);
      });
      
    },
    logOut({ commit }) {
      auth().signOut().then(() => {
        localStorage.removeItem('user');
        commit('logOut');
      })
    }
  }

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

  export default actions;