import Vuex from 'vuex';

export const store = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token || null;
      },
      INVALIDATE_TOKEN(state) {
        state.token = null;
      }
    },
    getters: {
      isVerified(state) {
        return state.token;
      }
    }
  });
};

export default store;
