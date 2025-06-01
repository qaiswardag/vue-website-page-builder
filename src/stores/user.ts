import { defineStore } from 'pinia'

interface UserState {
  isLoading: boolean
  userSettings: Record<string, unknown> | null
}

interface UserSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
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
