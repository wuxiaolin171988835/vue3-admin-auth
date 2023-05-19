<template>
  <el-container class="h-screen">
    <nav-menu></nav-menu>
    <el-container>
      <el-header class="bg-gray-600"
        ><el-button @click="loginOut" class="float-right mt-4"
          >退出登录</el-button
        ></el-header
      >
      <el-main class="bg-red-500"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { removeToken } from "@/utils/auth";
import navMenu from "./navMenu.vue";
import { useRouter } from "vue-router";
import { useHomeStore } from "@/store/home";
const router = useRouter();
const homeStore = useHomeStore();
const loginOut = () => {
  removeToken();
  homeStore.removeNav();
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
