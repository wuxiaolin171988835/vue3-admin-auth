<template>
  <el-aside width="200px" class="bg-purple-400"
    ><el-menu default-active="2" class="el-menu-vertical-demo" router>
      <el-menu-item v-for="v in navList" :index="v.path">
        <span>{{ v.title }}</span>
      </el-menu-item>
    </el-menu></el-aside
  >
</template>

<script setup>
import { useHomeStore } from "@/store/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const { navList } = storeToRefs(homeStore);
</script>

<style lang="scss" scoped></style>
