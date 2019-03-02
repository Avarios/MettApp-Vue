const mutations = {
    setAuthState(state, payload) {
      if (payload) {
        state.user = {
          name: payload.displayName,
          mail: payload.email,
          photoUrl: payload.photoURL,
          isAdmin: state.isAdmin,
          tenant: payload.tenant,
        };
        if(state.isAdmin) {
          state.user.paypalLink = payload.paypalLink
        } 
        state.isLoading = false;
      }

    },
    setUserData(state, payload) {
      state.user.tenant = payload.tenant;
      if(payload.paypalLink) {
        state.user.paypalLink = payload.paypalLink;
      }
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
    addEvent() {

    },
    deleteError(state){
      state.error = undefined;
    },
    deleteEvent(state) {
      state.isLoading = true;
    }
  }
  export default mutations;