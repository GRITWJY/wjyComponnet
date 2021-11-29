<template>
  <el-container class="manage-style">
    <el-header height="60px">
      <div class="nav-left">
        <img class="logo" src="../assets/logo.png" />
        <span class="title">湖工皇家航空平台</span>
      </div>
      <div class="nav-right">
        <el-dropdown trigger="hover">
          <div class="avatar-menu">
            <img class="avatar" src="../assets/logo.png" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-right" divided>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item v-for="(m,i) of menus" :key="i" :index="i+''" :ref="m.id" @click="$router.to(m.id)">
            <i :class="m.icon"></i>
            <span slot="title">{{ m.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-container"><slot /></el-main>
    </el-container>
    <el-footer height="30px">©湖工皇家航空平台</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'ManageStyle',
  data() {
    return {
      isCollapse: false,
      menus: [
        { id: 'dashboard', name: '首页', icon: 'el-icon-s-home' },
        { id: 'user', name: '用户管理', icon: 'el-icon-s-custom' },
        { id: 'flight', name: '航班', icon: 'el-icon-s-custom' },
        { id: 'choseseat', name: '选择座位', icon: 'el-icon-s-custom' },
        { id: 'selectquory', name: '输入个人信息提交订单', icon: 'el-icon-s-custom' },
        { id: 'ticket', name: '订单', icon: 'el-icon-s-custom' },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    to(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.manage-style {
  .el-menu {
    border-right: 0;
  }
}
</style>

<style lang="scss">
  $header-height: 60px;
  $footer-height: 30px;
  $aside-width: 240px;

  .el-header{
    background-color: #B3C0D1;
    height: $header-height;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .nav-left {
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .logo {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    .nav-right {
      width: auto;
      height: 100%;
      display: flex;
      align-items: stretch;
      .avatar-menu {
        display: flex;
        align-items: center;
        height: 100%;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          border: #FCFCFC 1px solid;
        }
      }
    }
  }
  .el-aside {
    background-color: #FFF;
    height: calc(100vh - #{ $header-height } - #{ $footer-height });
    width: $aside-width;
    overflow: hidden;
    border-right: solid 1px #e6e6e6;
  }
  .el-main {
    background-color: #FCFCFC;
    height: calc(100vh - #{ $header-height } - #{ $footer-height });
    overflow-x: hidden;
    overflow-y: auto;
    padding: 30px;
  }
  .el-footer {
    background-color: #B3C0D1;
    line-height: $footer-height;
    height: $footer-height;
    text-align: center;
    overflow: hidden;
    font-size: 8px;
  }
</style>