const mutations = {
    setAuthState(state, payload) {
      if (payload) {
        state.user = {
          name: payload.displayName,
          mail: payload.email,
          photoUrl: payload.photoURL,
          id: payload.uid,
          isAdmin: state.isAdmin,
          tenant: payload.tenant
        };
        state.isLoading = false;
      }

    },
    setUserData(state, payload) {
      state.user.tentant = payload.tenant;
      state.showTenantDialog = false;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, error) {
      state.error = error;
      state.isLoading = false;
    },
    setShowTenantDialog(state) {
      state.showTenantDialog = true;
    },
    logOut(state) {
      state.user = null;
      state.events = null;
    },
    setEventList(state, payload) {
      state.isLoading = false;
      state.events = payload;
    },
    setTenantList(state,payload) {
      state.tenants = payload;
    },
    addEvent(state, payload) {
      let newEvent = {
        ...payload,
        host: db.doc(`/user/${state.user.uid}`)
      }
    },
    deleteEvent(state, payload) {
      state.isLoading = true;
    }
  }
  export default mutations;