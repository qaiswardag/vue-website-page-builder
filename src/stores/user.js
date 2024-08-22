import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoading: false,
    userSettings: null,
  }),
  getters: {
    getIsLoading: (state) => state.isLoading,
    getUserSettings: (state) => state.userSettings,
  },
  actions: {
    setIsLoading(payload) {
      this.isLoading = payload;
    },
    setUserSettings(payload) {
      this.userSettings = payload;
    },
  },
});
