<template>
  <el-container class="about-contain">
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <Aside/>
      </el-aside>
      <el-main>
        <router-view :key="key()"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/aside";
import Header from '@/components/head'

export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    key(){
      return Date.now()
    }
  }
}
</script>

<style scoped lang="scss">
.el-aside,.el-header {
  background-color: #347e70;
}
</style>
