import { defineStore } from 'pinia'
import type { ImageObject } from '@/types'

interface MediaLibraryState {
  currentImage: ImageObject
  currentPreviewImage: string | null
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
