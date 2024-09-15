import { defineStore } from 'pinia';

export const useGraphStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
