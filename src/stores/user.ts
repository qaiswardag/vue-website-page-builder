import { defineStore } from 'pinia'
import type { UserSettings } from '@/types'

interface UserState {
  isLoading: boolean
  userSettings: UserSettings | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoading: false,
    userSettings: null,
  }),
  getters: {
    getIsLoading: (state: UserState): boolean => state.isLoading,
    getUserSettings: (state: UserState): UserSettings | null => state.userSettings,
  },
  actions: {
    setIsLoading(payload: boolean): void {
      this.isLoading = payload
    },
    setUserSettings(payload: UserSettings | null): void {
      this.userSettings = payload
    },
  },
})
