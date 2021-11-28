<template>
  <div class="login" :style="{'background-image': `url(${require('@/assets/images/login.jpg')})`}">
    <div class="login-form">
      <el-form>
        <div class="title">
          <span>企业信息管理平台</span>
        </div>
        <el-input
          class="form-item"
          type="text"
          placeholder="请输入用户名"
          v-model="loginform.username"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <el-input
          class="form-item"
          :type="showPassword?'text':'password'"
          placeholder="请输入密码"
          v-model="loginform.password"
        >
          <i slot="prefix" style="cursor: pointer;" :class="{
            'el-input__icon': true,
            'el-icon-lock': !showPassword,
            'el-icon-unlock': showPassword
          }" @click="showPassword = !showPassword"></i>
        </el-input>
      </el-form>
      <el-button class="login-btn form-item" @click="login">登录</el-button>
      <div class="form-item form-footer">
        <span>没有账号？前往<a class="link-style" link="./register">注册</a></span>
        <span class="link-style" style="float: right;">忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      loginform: {
        username: undefined,
        password: undefined
      }
    }
  },
  methods: {
    login() {
      this.$auth.login(this.loginform.username, this.loginform.password)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 2px 2px 3px #aaaaaa;
  .title {
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  .logo {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .login-form {
    width: 380px;
    padding: 27px;
    border-radius: 9px;
    background-color: #FCFCFCE4;
    .form-item {
      margin-top: 10px;
    }
    .login-btn {
      width: 100%;
    }
    .form-footer {
      font-size: 10px;
      margin-top: 12px;
      .link-style {
        color: #409EFF;
        cursor: pointer;
        &:HOVER {
          color: #50aEFF;
        }
      }
    }
  }
}
</style>