import { defineStore } from 'pinia';
import { vueFetch } from '@/composables/vueFetch';

// get images
const {
  handleData: handleGetImages,
  fetchedData: fetchedMedia,
  isError: isErrorImages,
  error: errorImages,
  errors: errorsImages,
  isLoading: isLoadingImages,
  isSuccess: isSuccessImages,
} = vueFetch();

export const useUnsplashStore = defineStore('unsplash', {
  state: () => ({
    unsplashImages: null,
    searchTerm: '',
    currentPageNumber: 1,
    orientationValue: null,
  }),
  getters: {
    getUnsplashImages: (state) => {
      return state.unsplashImages;
    },
    getSearchTerm: (state) => state.searchTerm,
    getCurrentPageNumber: (state) => state.currentPageNumber,
    getOrientationValue: (state) => state.orientationValue,
  },
  actions: {
    setUnsplashImages(payload) {
      this.unsplashImages = payload;
    },
    setSearchTerm(payload) {
      this.searchTerm = payload;
    },
    setCurrentPageNumber(payload) {
      this.currentPageNumber = payload;
    },
    setOrientationValue(payload) {
      this.orientationValue = payload;
    },

    // Load Unsplash images
    async setLoadUnsplashImages(payload) {
      this.setUnsplashImages({
        fetchedMedia: null,
        isError: null,
        error: null,
        errors: null,
        isLoading: true,
        isSuccess: null,
      });

      let orientationType = payload.orientation
        ? `&orientation=${payload.orientation}`
        : '';

      const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;

      await handleGetImages(
        `https://api.unsplash.com/search/photos?page=${payload.currentPage}&per_page=24&query=${payload.searchTerm || 'a'}${orientationType}`,
        {
          headers: {
            'Accept-Version': 'v1',
            Authorization: unsplashKey,
          },
        },
        { additionalCallTime: 500 }
      );

      // Update state directly instead of committing mutations
      this.setUnsplashImages({
        fetchedMedia: fetchedMedia.value,
        isError: isErrorImages.value,
        error: errorImages.value,
        errors: errorsImages.value,
        isLoading: isLoadingImages.value,
        isSuccess: isSuccessImages.value,
      });
    },
  },
});
