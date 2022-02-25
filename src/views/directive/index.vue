<template>
  <div>
    <button v-copy=copyText>复制</button>
    <button v-longpress=longpress>长按</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyText: "fashfuisafiulas"
    }
  },
  created() {
  },
  methods: {
    longpress() {
      alert('生效')
    }
  }
}
</script>

<style scoped>

</style>
