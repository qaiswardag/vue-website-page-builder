import { defineStore } from 'pinia'

interface MediaLibraryState {
  currentImage: ImageObject
  currentPreviewImage: string | null
}

interface ImageObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useMediaLibraryStore = defineStore('mediaLibrary', {
  state: (): MediaLibraryState => ({
    currentImage: {},
    currentPreviewImage: null,
  }),
  getters: {
    getCurrentImage(state: MediaLibraryState): ImageObject {
      return state.currentImage
    },
    getCurrentPreviewImage(state: MediaLibraryState): string | null {
      return state.currentPreviewImage
    },
  },
  actions: {
    setCurrentImage(payload: ImageObject): void {
      this.currentImage = payload
    },
    setCurrentPreviewImage(payload: string | null): void {
      this.currentPreviewImage = payload
    },
  },
})
