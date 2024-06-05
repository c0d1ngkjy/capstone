import { defineStore } from 'pinia';

export const useJwtStore = defineStore('jwt', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
    },
  },
});
