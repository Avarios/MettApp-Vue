const getters = {
    user: state => {
      if (state.user) {
        return state.user;
      }
      return null;
    },
    paypalLink: state => {
      if(state.user) {
        return state.user.paypalLink ? state.user.paypalLink : undefined
      }
      return undefined;
    },
    selectedTenant: state => {
      if(state.user) {
        return state.user.tenant ? state.user.tenant : undefined
      }
      return undefined;
    },
    isAdmin: state => {
      return state.isAdmin;
    },
    tentans: state => {
      return state.tentants;
    },
    error: state => {
      return state.error ? state.error.message : undefined;
    }
  }

export default getters;