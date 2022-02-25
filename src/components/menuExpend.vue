<template>
  <div class="DropDown">
    <div class="DropDown_content">
      <a
        v-for="(exp,i) in expList"
        :key="'list' + i"
        class="fl">
        <img :src="exp.img" :alt="exp.name" :style="{height:exp.imgHeight}">
        <dt>{{ exp.name }}</dt>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
  },
  methods: {},
  props: {
    expList: {
      type: Array,
      default: null
    }
  }
}
</script>

