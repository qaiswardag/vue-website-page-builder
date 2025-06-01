import { defineStore } from 'pinia'
import { vueFetch } from '@/composables/vueFetch.ts'

interface UnsplashState {
  unsplashImages: UnsplashImagesData | null
  searchTerm: string
  currentPageNumber: number
  orientationValue: string | null
}

interface UnsplashImagesData {
  fetchedMedia: unknown
  isError: boolean | null
  error: unknown
  errors: unknown
  isLoading: boolean | null
  isSuccess: boolean | null
}

interface LoadUnsplashImagesPayload {
  orientation?: string
  currentPage: number
  searchTerm?: string
}

// get images
const {
  handleData: handleGetImages,
  fetchedData: fetchedMedia,
  isError: isErrorImages,
  error: errorImages,
  errors: errorsImages,
  isLoading: isLoadingImages,
  isSuccess: isSuccessImages,
} = vueFetch()

export const useUnsplashStore = defineStore('unsplash', {
  state: (): UnsplashState => ({
    unsplashImages: null,
    searchTerm: '',
    currentPageNumber: 1,
    orientationValue: null,
  }),
  getters: {
    getUnsplashImages: (state: UnsplashState): UnsplashImagesData | null => {
      return state.unsplashImages
    },
    getSearchTerm: (state: UnsplashState): string => state.searchTerm,
    getCurrentPageNumber: (state: UnsplashState): number => state.currentPageNumber,
    getOrientationValue: (state: UnsplashState): string | null => state.orientationValue,
  },
  actions: {
    setUnsplashImages(payload: UnsplashImagesData | null): void {
      this.unsplashImages = payload
    },
    setSearchTerm(payload: string): void {
      this.searchTerm = payload
    },
    setCurrentPageNumber(payload: number): void {
      this.currentPageNumber = payload
    },
    setOrientationValue(payload: string | null): void {
      this.orientationValue = payload
    },

    // Load Unsplash images
    async setLoadUnsplashImages(payload: LoadUnsplashImagesPayload): Promise<void> {
      this.setUnsplashImages({
        fetchedMedia: null,
        isError: null,
        error: null,
        errors: null,
        isLoading: true,
        isSuccess: null,
      })

      const orientationType = payload.orientation ? `&orientation=${payload.orientation}` : ''

      const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY as string

      try {
        await handleGetImages(
          `https://api.unsplash.com/search/photos?page=${payload.currentPage}&per_page=24&query=${payload.searchTerm || 'a'}${orientationType}`,
          {
            headers: {
              'Accept-Version': 'v1',
              Authorization: unsplashKey,
            },
          },
          { additionalCallTime: 500 },
        )
      } catch (err) {
        console.log(`Error: ${err}`)
      }

      // Update state directly instead of committing mutations
      this.setUnsplashImages({
        fetchedMedia: fetchedMedia.value,
        isError: isErrorImages.value,
        error: errorImages.value,
        errors: errorsImages.value,
        isLoading: isLoadingImages.value,
        isSuccess: isSuccessImages.value,
      })
    },
  },
})
