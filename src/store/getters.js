const getters = {
    user: state => {
      if (state.user) {
        return state.user;
      }
      return null;
    },
    isAdmin: state => {
      return state.isAdmin;
    },
    tentans: state => {
      return state.tentants;
    }
  }

export default getters;