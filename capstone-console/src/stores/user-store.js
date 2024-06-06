import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentClub: null,
  }),
  actions: {
    setCurrentClub(currentClub) {
      this.currentClub = currentClub;
    },
    clearToken() {
      this.currentClub = null;
    },
  },
  persist: true
});
