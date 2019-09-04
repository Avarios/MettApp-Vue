
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
  // eslint-disable-next-line no-unused-vars
  register({ commit }, payload) {
    commit('setLoading', true);
    auth().createUserWithEmailAndPassword(payload.email, payload.password).then(() => {

    }).catch(err => {
      commit('setLoading', false);
      commit('setError', err);
    })
  },
  setUserData({ commit, state }, payload) {
    db.collection('user').doc(payload.mail).get().then(result => {
      if (result.exists) {
        db.collection('user').doc(payload.mail).update({
          tenant: payload.tenant,
          paypalLink: payload.paypalLink ? payload.paypalLink : '',
          bunPrice: payload.bunPrice ? payload.bunPrice : 1.0
        }).then(() => {
          subscribeToSnapshot(commit, payload.tenant)
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
        if (!payload.name) {
          record.name = payload.mail;
        }
        db.collection('user').doc(payload.mail).set(record).then(() => {
          commit('setUserData', payload);
        })
      }
    });

  },
  // eslint-disable-next-line no-unused-vars
  subscribe({ commit }, payload) {
    let { id, value, name, userId, tenant } = payload;
    db.collection('events').doc(tenant).collection('events').doc(id).update("subscriber", FieldValue.arrayUnion(
      {
        uid: userId,
        buns: value,
        name: name
      }
    ));
  },
  // eslint-disable-next-line no-unused-vars
  unscribe({ commit }, payload) {
    let { id, userId, tenant } = payload;
    db.collection('events').doc(tenant).collection('events').doc(id).get().then(result => {
      let { subscriber } = result.data();
      db.collection('events').doc(tenant).collection('events').doc(id).update({
        subscriber: subscriber.filter(sub => sub.uid !== userId)
      })
    })

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
  // eslint-disable-next-line no-unused-vars
  deleteEvent({ commit }, payload) {
    let { id, tenant } = payload;
    db.collection('events').doc(tenant).collection('events').doc(id).delete();
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

      if (result.exists && result.data().tenant) {
        let { tenant } = result.data();
        subscribeToSnapshot(commit, tenant)
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

const subscribeToSnapshot = (commit, tenant) => {
  db.collection('events').doc(tenant).collection('events').onSnapshot(snap => {
    let items = mapEventData(snap.docs, tenant);
    commit('setEventList', items);
  });
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