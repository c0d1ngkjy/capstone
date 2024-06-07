import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentClub: null,
    userData: null,
  }),
  actions: {
    setCurrentClub(currentClub) {
      this.currentClub = currentClub;
    },
    clearToken() {
      this.currentClub = null;
    },
    setUserData(userData) {
      this.userData = userData;
    },
    clearUserData() {
      this.userData = null;
    }
  },
  persist: true
});
