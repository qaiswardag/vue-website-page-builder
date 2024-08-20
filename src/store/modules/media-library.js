export default {
  namespaced: true,

  // state
  state: {
    currentImage: {},
    currentMedia: null,
    currentPreviewImage: null,
    // end state
  },

  // getters
  getters: {
    getCurrentImage(state) {
      return state.currentImage;
    },
    getCurrentMedia(state) {
      return state.currentMedia;
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
    setCurrentMedia(state, payload) {
      state.currentMedia = payload;
    },
    setCurrentPreviewImage(state, payload) {
      state.currentPreviewImage = payload;
    },

    // end mutations
  },

  // actions
  actions: {},
};
