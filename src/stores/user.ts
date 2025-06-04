import { defineStore } from 'pinia'
import type { UserSettings, User } from '@/types'

interface UserState {
  isLoading: boolean
  userSettings: UserSettings | null
  currentUser: User | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoading: false,
    userSettings: null,
    currentUser: null,
  }),
  getters: {
    getIsLoading: (state: UserState): boolean => state.isLoading,
    getUserSettings: (state: UserState): UserSettings | null => state.userSettings,
    getCurrentUser: (state: UserState): User | null => state.currentUser,
  },
  actions: {
    setIsLoading(payload: boolean): void {
      this.isLoading = payload
    },
    setUserSettings(payload: UserSettings | null): void {
      this.userSettings = payload
    },
    setCurrentUser(payload: User | null): void {
      this.currentUser = payload
    },
  },
})
