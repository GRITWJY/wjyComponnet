<template>
  <div class="menu">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :unique-opened=true
      text-color="#ffffff"
      active-text-color="#ffffff"
    >
      <component
        v-for="(m,i) of menus"
        :is="'el-submenu'"
        :key="m.index"
        :index="m.index"
        :data="m.index"
        v-if="m.show"
        id="el-submenu"
        :class="{
             'menu-active': defaultActive == m.index
            }"
      >
        <template slot="title">
          <div style="display: flex;flex-direction: row">
            <div @click="menuClick(m)">
              <img v-show="m.list && !defaultActive.startsWith(i)" src="../assets/plus-square.png" alt="加号"
                   width="18px"
                   height="18px" style="margin-right: 5px">
              <img v-show="m.list && defaultActive.startsWith(i)" src="../assets/minus-square.png" alt="加号"
                   width="18px"
                   height="18px" style="margin-right: 5px">
              <span>{{ m.name }}</span>
            </div>
            <div style="height:50px;flex: 1" @click="menuClick(m)"></div>
          </div>
        </template>
        <div v-if="m.index != '8'">
          <el-menu-item
            v-for="(mm,j) of m.list ? m.list:[]"
            :key="j"
            v-if="mm.show"
            :index="i+'-'+j"
            :class="{
                'menu-active': defaultActive == mm.index
              }"
            @click="menuClick(mm)"
          >{{ mm.name }}
          </el-menu-item>
        </div>
        <div v-else>
          <el-submenu
            v-for="(mm,j) of m.list ? m.list:[]"
            :key="j"
            v-if="mm.show"
            :index=mm.index
            :data="mm.index"
            :class="{
                'menu-active': defaultActive == mm.index
              }"
          >
            <template slot="title">
              <div style="display: flex;flex-direction: row">
                <div @click="menuClick(mm)">
                  <img v-show="mm.list && !defaultActive.startsWith(i + '-' + j)" src="../assets/plus-square.png"
                       alt="加号"
                       width="18px"
                       height="18px" style="margin-right: 5px">
                  <img v-show="mm.list && defaultActive.startsWith(i + '-' + j)" src="../assets/minus-square.png"
                       alt="加号"
                       width="18px"
                       height="18px" style="margin-right: 5px">
                  <span>{{ mm.name }}</span>
                </div>
                <div style="height:50px;flex: 1" @click="menuClick(mm)"></div>
              </div>
            </template>
            <el-menu-item
              v-for="(mmm,k) of mm.list ? mm.list:[]"
              :key="k"
              :index="mmm.index"
              :class="{
                'menu-active': defaultActive == mmm.index
              }"
              @click="menuClick(mmm)"
            >{{ mmm.name }}
            </el-menu-item>


          </el-submenu>

        </div>
      </component>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "1",
      menus: this.$common.navMenu
    }
  },
  mounted() {
    this.searchRoute()
    let authArr = this.$storage.getUserInfo().menuindex.split(',')
    for (let i = 0; i < authArr.length; i++) {
      let idx = authArr[i]
      if (idx.length === 1) {
        let menu = this.$common.navMenu[idx]
        menu.show = true
        if (menu.list) {
          menu.list.forEach(item => {
            item.show = true
          })
        }
      }
    }
  },
  methods: {

    searchRoute() {
      let _this = this
      fun(this.menus)

      function fun(routes) {
        for (let i = 0; i < routes.length; i++) {
          let routeObj = routes[i]
          if (routeObj.id === _this.$route.name) {
            _this.defaultActive = routeObj.index
          }
          if (routeObj.list && routeObj.list.length > 0) {
            fun(routeObj.list)
          }
        }
      }
    },

    menuClick(m) {
      this.defaultActive = m.index
      if (m.index.indexOf("8") != -1) {
        console.log(m.index.length)
        if (m.index.length <= 2) {
          this.$router.push({name: m.id, params: {city: "-", storage: "-"}})
        } else if (m.index.length <= 4) {
          this.$router.push({name: m.id, params: {city: m.city, storage: "-"}})
        } else {
          this.$router.push({name: m.id, params: {city: m.city, storage: m.storage_id}})
        }
      } else {
        if (m.id) {
          this.$router.push({name: m.id})
        } else {
          return
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.menu {
  overflow-y: scroll;
  height: calc(100vh - 60px);
}

.menu-active {
  background-color: #42b983 !important;
}
</style>

