<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl">后台管理系统</h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="mt-10 w-96"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api";
import { setToken } from "@/utils/auth";
const router = useRouter();
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "",
  password: ""
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 5, message: "长度在3-5位", trigger: "blur" }
  ]
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(ruleForm);
      const { status, token } = res.data;
      if (status) {
        setToken(token);
        ElMessage({
          message: "登录成功",
          type: "success"
        });
        router.push("/index");
      } else {
        ElMessage({
          message: "登录失败",
          type: "fail"
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped></style>
