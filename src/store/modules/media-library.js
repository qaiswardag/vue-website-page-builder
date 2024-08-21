export default {
  namespaced: true,

  // state
  state: {
    currentImage: {},

    currentPreviewImage: null,
    // end state
  },

  // getters
  getters: {
    getCurrentImage(state) {
      return state.currentImage;
    },
    getCurrentPreviewImage(state) {
      return state.currentPreviewImage;
    },

    // end getters
  },

  // mutations
  mutations: {
    setCurrentImage(state, payload) {
      state.currentImage = payload;
    },
    setCurrentPreviewImage(state, payload) {
      state.currentPreviewImage = payload;
    },

    // end mutations
  },

  // actions
  actions: {},
};
