
import { auth, googleProvider, githubProvider, db, FieldValue } from '../services/firebase.service';
import moment from 'moment';

const actions = {
  loginSocial({ commit }, provider) {
    commit('setLoading', true);
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
  login({ commit }, payload) {
    commit('setLoading', true);
    auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
      commit('setAuthState', auth().currentUser);
    }, err => {
      commit('setError', err);
      commit('setLoading', false);
    })
  },
  setUserData({ commit }, payload) {
    db.collection('user').doc(payload.mail).get().then(result => {
      if (result.exists) {
        db.collection('user').doc(payload.mail).update({
          tenant: payload.tenant,
          paypalLink: payload.paypalLink ? payload.paypalLink : '',
          bunPrice: payload.bunPrice ? payload.bunPrice : 1.0
        }).then(() => {
          commit('setUserData', payload);
        })
      } else {
        let record = {
          tenant: payload.tenant
        }
        if (payload.paypalLink) {
          record.paypalLink = payload.paypalLink;
        }
        if (payload.bunPrice) {
          record.bunPrice = payload.bunPrice;
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
  subscribe({ commit }, payload) {
    let { id, value, name, userId, tenant } = payload;
    db.collection('events').doc(tenant).collection('events').doc(id).update("subscriber", FieldValue.arrayUnion(
      {
        uid: userId,
        buns: value,
        name: name
      }
    ));
    commit('subscribed');
  },
  unscribe({ commit }, payload) {
    let { id, userId, subs, tenant } = payload;
    db.collection('events').doc(tenant).collection('events').doc(id).update({
      subscriber: subs.filter(sub => sub.uid !== userId)
    })
    commit('unscribed');
  },
  addEvent({ commit }, payload) {
    const { mail, tenant, bunPrice, ...eventData } = payload;
    let newEvent = {
      ...eventData,
      hostId: mail,
      bunPrice: bunPrice
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
        return { "key": item.id, "value": item.data().name }
      });
      commit('setTenantList', tenants);
    }, () => {
      //TODO: ERROR !
    });

    db.collection('user').doc(mail).get().then(result => {
      let user = { ...payload };
      if (result.exists) {
        let data = result.data();
        if (data.isAdmin) {
          commit('setAdmin');
        }
        if (data.tenant) {
          user.tenant = data.tenant;
        }
        if (data.paypalLink) {
          user.paypalLink = data.paypalLink;
        }
        if (data.bunPrice) {
          user.bunPrice = data.bunPrice;
        }
      }
      if (!result.exists || !result.data().tenant) {
        commit('setShowTenantDialog');
      }
      const { tenant } = result.data();
      if (result.exists && tenant) {
        db.collection('events').doc(tenant).collection('events').onSnapshot(snap => {
          let items = mapEventData(snap.docs, tenant);
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

const mapEventData = (docs, tenant) => {
  return docs.map(result => {
    var item = result.data();
    var event = {
      id: result.id,
      subscriber: item.subscriber,
      date: moment.unix(item.eventDate.seconds).format('DD.MM.YYYY'),
      name: item.hoster,
      link: item.paypal,
      allowPaypal: item.allowPaypal,
      hostId: item.hostId,
      bunPrice: item.bunPrice,
      tenant: tenant
    };
    return event;
  })
}

export default actions;