<template>
  <div class="login_wrap">
    <img class="bg_img" src="../assets/images/1.png" alt="" />
    <div class="form_wrap">
      <img class="bear_img" src="../assets/images/2.png" alt="" />
      <!-- vant表单 -->
      <van-cell-group inset class="form">
        <van-field
          class="login_input"
          v-model="form.userName"
          label="文本"
          left-icon="manager-o"
          placeholder="请输入账户"
        />
        <van-field
          class="login_input"
          v-model="form.userPassword"
          clearable
          label="文本"
          left-icon="music-o"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <van-button type="primary" @click="handleLogin" v-if="loginStatue == 1"
        >登录</van-button
      >
      <van-button type="primary" @click="handleRegist" v-if="loginStatue == 2"
        >注册</van-button
      >

      <p class="form_bottom">
        <span @click="handleChangeStatus">{{
          loginStatue == 1 ? "去注册" : "去登录"
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { loginApi, registApi } from "../utils/request";
import { Toast } from "vant";
import { user } from "../store/userInfo";
import { useRouter } from "vue-router";
const userinfo = user();
const loginStatue = ref<number>(1);
const router = useRouter();
const form = reactive<any>({
  userName: "",
  userPassword: "",
});
const handleChangeStatus = () => {
  loginStatue.value = loginStatue.value == 1 ? 2 : 1;
};
const handleLogin = () => {
  loginApi({
    userName: form.userName,
    userPassword: form.userPassword,
  }).then((res: any) => {
    if (res.code === 200) {
      localStorage.setItem("uInfo", JSON.stringify(res.body));
      userinfo.setUInfo(res.body);
      router.push({path:"/"})
    }
    console.log("登录数据", res);
  });
};
const handleRegist = () => {
  registApi({
    userName: form.userName,
    userPassword: form.userPassword,
  }).then((res: any) => {
    console.log("注册信息", res);
    if (res.code === 200) {
      Toast("注册成功");
    }
  });
};
</script>

<style lang="less" scoped>
.login_wrap {
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  .bg_img {
    display: block;
    width: 100%;
  }
  .form_wrap {
    position: absolute;
    bottom: 0;
    top: 540px;
    width: 100%;
    background-color: rgba(221, 168, 0);
    padding: 50px, 20px;
    .bear_img {
      position: absolute;
      width: 368px;
      top: -290px;
      left: 30px;
    }
    .form {
      margin-top: 80px;
      background: none;
      border: 1px solid #fff;
      border-radius: 38px;
      margin-bottom: 60px;
    }
    .form_bottom {
      display: flex;
      margin-top: 60px;
      justify-content: flex-end; //居右对齐
    }
  }
}
</style>