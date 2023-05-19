import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    navList: []
  }),
  actions: {
    setNav(data) {
      this.navList = data;
    },
    removeNav() {
      this.navList = [];
    }
  }
});
