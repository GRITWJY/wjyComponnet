<template>
  <div id="app">
    <component :is="curPage" />
  </div>
</template>

<script>
import router from './core/router'

export default {
  name: 'App',
  components: router.components,
  data() {
    return {
      curPage: undefined,
      isRouterAlive:true
    }
  },
  created() {
        this.curPage = 'c' + this.$router.curPage
        this.$router.onPathChange = () => {
          this.curPage = 'c' + this.$router.curPage
        }
        window.vm = this
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
</style>
