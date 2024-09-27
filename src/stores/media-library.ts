import { defineStore } from 'pinia';

export const useMediaLibraryStore = defineStore('mediaLibrary', {
  state: () => ({
    currentImage: {},
    currentPreviewImage: null,
  }),
  getters: {
    getCurrentImage(state) {
      return state.currentImage;
    },
    getCurrentPreviewImage(state) {
      return state.currentPreviewImage;
    },
  },
  actions: {
    setCurrentImage(payload) {
      this.currentImage = payload;
    },
    setCurrentPreviewImage(payload) {
      this.currentPreviewImage = payload;
    },
  },
});
