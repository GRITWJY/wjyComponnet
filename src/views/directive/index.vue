<template>
  <div>
    <button v-copy=copyText>复制</button>
    <button v-longpress=longpress>长按</button>
    <el-button v-debounce=debounceClick>防抖</el-button>
    <input type="text" v-model="note" v-valid/>

    <input v-model="form.username" v-valid:username="['username',form.username]"/>
    <span></span>
    <img v-lazyload=img>
    <!-- 显示 -->
    <button v-permission="'1'">权限按钮1</button>
    <!-- 不显示 -->
    <button v-permission="'10'">权限按钮2</button>

    <div
      v-draggable
      style="width:100px;height:100px;background-color:#f00;">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyText: "fashfuisafiulas",
      note: "",
      form: {
        username: ""
      },
      img: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
    }
  },
  created() {
  },
  methods: {
    longpress() {
      alert('生效')
    },
    debounceClick() {
      console.log('防抖')
    }
  }
}
</script>

<style scoped>

</style>
