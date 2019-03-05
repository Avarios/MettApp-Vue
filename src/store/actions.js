
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
    subscribe(payload) {
      let { id } = payload;
      db.collection('events').doc(payload.tenant).collection('events').doc(id).collection('subscriber').add(payload);
    },
    setUserData({commit}, payload) {
      db.collection('user').doc(payload.mail).get().then(result => {
        if(result.exists){
          db.collection('user').doc(payload.mail).update({
            tenant: payload.tenant,
            paypalLink: payload.paypalLink ? payload.paypalLink : ''
          }).then(() => {
            commit('setUserData', payload);
          })
        } else {
          let record = {
            tenant: payload.tenant
          }
          if(payload.paypalLink) {
            record.paypalLink = payload.paypalLink;
          }
          db.collection('user').doc(payload.mail).set(record).then(() => {
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
      const { mail,tenant,...eventData } = payload;
      let newEvent = {
        ...eventData,
        host: db.collection('user').doc(mail)
      };
      db.collection('events').doc(tenant).collection('events').add(newEvent).then(() => {
        commit('addEvent', payload);
      });  
    },
    deleteEvent({ commit }, payload) {
      commit('deleteEvent', payload);
    },
    firebaseInit({ commit }, payload) {
      let mail = payload.email;
      db.collection('tenants').get().then(results => {
        let tenants = results.docs.map(item => {
          return {"key": item.id , "value":item.data().name}
        });
        commit('setTenantList',tenants);
      }, () => {
        //TODO: ERROR !
      });
     
      db.collection('user').doc(mail).get().then(result => {
        let user = {...payload};
        if(result.exists) {
          if(result.data().isAdmin){
            commit('setAdmin');
          }
          if(result.data().tenant) {
            user.tenant = result.data().tenant;
          }
          if(result.data().paypalLink) {
            user.paypalLink =result.data().paypalLink;
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
      }, () => {
        //TODO: ERROR
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