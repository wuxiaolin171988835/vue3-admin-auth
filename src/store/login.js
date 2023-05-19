import { defineStore } from "pinia";
export const useLoginStore = defineStore("login", {
  state: () => ({
    test: ""
  }),
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [{ storage: localStorage, paths: ["token"] }]
  }
});
