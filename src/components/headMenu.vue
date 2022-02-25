<template>
  <div>
    <!-- 菜单组件   -->
    <div class="pc_header">
      <div class="pc_header_content">
        <!--   左侧Logo     -->
        <a class="header_content_logo fl">
          <img :src=logo>
        </a>
        <!--   中间子菜单部分     -->
        <div class="header_content_right fr">
          <div class="menu fl">
            <ul>
              <li
                v-for="(item,i) in menuItems"
                :key="'item' + i"
                class="fl menuItem"
                :class="{'on':item.name === curItem}"
              >
                <span
                  class="menu_title"
                  :class="{service_items:item.expand.show}"
                >
                   <div @click="jump(item)">
                    {{ item.name }}
                   </div>
                </span>

                <div v-if="item.expand.show">
                  <menu-expend
                    :exp-list="item.expand.list"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="header_content_phone fr">{{ phone }}</div>
        </div>
        <!--   右侧电话部分     -->
        <div class="burger fr">
          <div class="x"></div>
          <div class="y"></div>
          <div class="z"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import logo from '../assets/images/logo.png'
import menuExpend from "@/components/menuExpend";

export default {
  components: {
    menuExpend
  },
  data() {
    return {
      curItem: "首页",
      logo: logo,
      phone: "17671071521",
      menuItems: [
        {
          name: "首页",
          id: null,
          expand: {
            show: false
          }
        },
        {
          name: "关于我们",
          id: null,
          expand: {
            show: false
          }
        },
        {
          name: "服务项目",
          id: null,
          expand: {
            show: true,
            imgHeight: '40px',
            count: 4,
            list: [{
              name: '高端网站定制',
              img: logo
            }, {
              name: '高端网站定制',
              img: logo
            }, {
              name: '高端网站定制',
              img: logo
            }, {
              name: '高端网站定制',
              img: logo
            }]
          }
        },
        {
          name: "案例展示",
          id: null,
          expand: {
            show: false
          }
        },
        {
          name: "新闻动态",
          id: null,
          expand: {
            show: false
          }
        },
        {
          name: "联系我们",
          id: null,
          expand: {
            show: false
          }
        }
      ]
    }
  },
  mounted() {
    this.ready()
  },
  created() {
  },
  methods: {
    ready() {

      $(".burger").click(function () {
        console.log("faf")
        $(".banner").toggleClass("on");
      });


      $(function () {
        if ($(window).width() >= 1065) {
        } else {
          $(".service_items").click(function () {
            console.log("on")
            $(".DropDown").addClass("on");
            $(".DropDown").removeClass("in");
            $(".menu_title ").hide();
          })
          $(".DropDown").append("<div class='DropDown_close iconfont icon-close'></div>")
          $(".DropDown_close").click(function () {
            $(".DropDown").removeClass("on");
            $(".DropDown").addClass("in");
            $(".menu_title ").show();
          })
        }
      });


      //移动切换
      if ('ontouchstart' in window) {
        var click = 'touchstart';
      } else {
        var click = 'click';
      }


      $('div.burger').on(click, function () {
        if (!$(this).hasClass('open')) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      function openMenu() {
        $('div.circle').addClass('expand');
        $('div.burger').addClass('open');
        $('div.x, div.y, div.z').addClass('collapse');
        $('.menu li').addClass('animate');
        $('.menu').addClass('on');
        setTimeout(function () {
          $('div.y').hide();
          $('div.x').addClass('rotate30');
          $('div.z').addClass('rotate150');
        }, 70);
        setTimeout(function () {
          $('div.x').addClass('rotate45');
          $('div.z').addClass('rotate135');
        }, 120);
      }

      function closeMenu() {
        $('div.burger').removeClass('open');
        $('div.x').removeClass('rotate45').addClass('rotate30');
        $('div.z').removeClass('rotate135').addClass('rotate150');
        $('div.circle').removeClass('expand');
        $('.menu li').removeClass('animate');
        $('.menu').removeClass('on');
        setTimeout(function () {
          $('div.x').removeClass('rotate30');
          $('div.z').removeClass('rotate150');
        }, 50);
        setTimeout(function () {
          $('div.y').show();
          $('div.x, div.y, div.z').removeClass('collapse');
        }, 70);
      }
    },
    jump(item) {
    }
  }
}
</script>

<style lang="scss">

.pc_header .pc_header_content .header_content_right .menu ul li:hover .DropDown .DropDown_close {
  color: #fff;
  font-size: 28px;
  position: absolute;
  right: 10px;
  top: 10px;
  display: none;
}

.pc_header .pc_header_content .header_content_right .menu ul li:hover .DropDown {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  cursor: pointer;
  opacity: 1;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown {
  position: absolute;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, .5);
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  cursor: pointer;
  opacity: 0;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown.on {
  -webkit-transform: scale(1) !important;
  -moz-transform: scale(1) !important;
  -ms-transform: scale(1) !important;
  -o-transform: scale(1) !important;
  transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  cursor: pointer;
  opacity: 1;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown.in {
  -webkit-transform: scale(0) !important;
  -moz-transform: scale(0) !important;
  -ms-transform: scale(0) !important;
  -o-transform: scale(0) !important;
  transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  cursor: pointer;
  opacity: 0;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown .DropDown_content {
  max-width: 1500px;
  margin: 0 auto;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown a:last-child {
  border: 0;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown a {
  display: inline-block;
  width: 25%;
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 25px 0px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  box-sizing: border-box;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown a.on dd {
  color: #ff7019;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown a dd {
  font-size: 35px;
  margin-bottom: 15px;
}

.pc_header .pc_header_content .header_content_right .menu ul li .DropDown a:hover dd {
  color: #ff7019;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
}


// 大屏
.pc_header {
  background-color: #000000;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  height: 88px;
  z-index: 50;
  transition: all 2s ease; // 用于样式切换时的动效
  -moz-transition: all 2s ease;

  .pc_header_content {
    max-width: 1500px;
    margin: 0 auto;

    // 左侧图片
    .header_content_logo {
      display: inline-block;
      line-height: 88px;
    }

    // 右侧内容
    .header_content_right {

      // 手机号
      .header_content_phone {
        font-size: 24px;
        color: #fff;
        line-height: 88px;
      }

      // 菜单选项
      .menu ul li {
        margin-right: 47px;

        .menu_title {
          font-size: 16px;
          display: inline-block;
          color: #fff;
          line-height: 88px;
          position: relative;
          text-align: center;
          width: 64px;

          ::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: inline-block;
            height: 1px;
            background-color: #ff7019;
            opacity: 0;
            transition: all 0.5s ease;

          }
        }
      }

      .menu ul li:hover .menu_title:before {
        opacity: 1;
        transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
      }

      .menu ul li:hover .menu_title {
        color: #ff7019;
      }

      .menu ul li.on .menu_title {
        color: #ff7019;
      }
    }
  }
}

// 班级本吧
@media screen and (max-width: 1480px) {
  .pc_header .pc_header_content {
    max-width: 1200px;
  }
  .DropDown_content {
    max-width: 1200px;
  }

}

// 平板
@media screen and (max-width: 1065px) {

  div.burger {
    z-index: 50;
    height: 36px;
    width: 26px;
    position: relative;
    cursor: pointer
  }

  div.x, div.y, div.z {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background: #ff7019;
    border-radius: 2px;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -ms-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out
  }

  div.x, div.y, div.z {
    height: 2px;
    width: 20px
  }

  div.y {
    top: 14px;
    width: 16px;
  }

  div.z {
    top: 28px
  }

  div.collapse {
    top: 20px;
    background: #ff7019;
    -webkit-transition: all 70ms ease-out;
    -moz-transition: all 70ms ease-out;
    -ms-transition: all 70ms ease-out;
    -o-transition: all 70ms ease-out;
    transition: all 70ms ease-out
  }

  div.rotate30 {
    -ms-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-transition: all 50ms ease-out;
    -moz-transition: all 50ms ease-out;
    -ms-transition: all 50ms ease-out;
    -o-transition: all 50ms ease-out;
    transition: all 50ms ease-out
  }

  div.rotate150 {
    -ms-transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-transition: all 50ms ease-out;
    -moz-transition: all 50ms ease-out;
    -ms-transition: all 50ms ease-out;
    -o-transition: all 50ms ease-out;
    transition: all 50ms ease-out
  }

  div.rotate45 {
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out
  }

  div.rotate135 {
    -ms-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out
  }

  div.menu ul li {
    width: 100%;
    list-style: none;
    position: absolute;
    top: 50px;
    left: 0;
    height: 0px;
    overflow: hidden;
    opacity: 0;
    z-index: 1;
    text-align: center;
    font-size: 0;
    -webkit-transition: all 70ms cubic-bezier(0, .995, .99, 1);
    -moz-transition: all 70ms cubic-bezier(0, .995, .99, 1);
    -ms-transition: all 70ms cubic-bezier(0, .995, .99, 1);
    -o-transition: all 70ms cubic-bezier(0, .995, .99, 1);
    transition: all 70ms cubic-bezier(0, .995, .99, 1)
  }

  div.menu ul li span {
    color: #ff7019;
    width: 100%;
    font-size: 16px;
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 3px
  }

  div.menu li.animate {
    font-size: 21px;
    opacity: 1;
    overflow: inherit;
    position: fixed;
    z-index: 6000;
    -webkit-transition: all 150ms cubic-bezier(0, .995, .99, 1);
    -moz-transition: all 150ms cubic-bezier(0, .995, .99, 1);
    -ms-transition: all 150ms cubic-bezier(0, .995, .99, 1);
    -o-transition: all 150ms cubic-bezier(0, .995, .99, 1);
    transition: all 150ms cubic-bezier(0, .995, .99, 1)
  }

  div.menu li.animate:nth-of-type(1) {
    top: 120px;
    transition-delay: .06s
  }

  div.menu li.animate:nth-of-type(2) {
    top: 190px;
    transition-delay: .09s
  }

  div.menu li.animate:nth-of-type(3) {
    top: 260px;
    transition-delay: .12s
  }

  div.menu li.animate:nth-of-type(4) {
    top: 330px;
    transition-delay: .15s
  }

  div.menu li.animate:nth-of-type(5) {
    top: 400px;
    transition-delay: .17s
  }

  div.menu li.animate:nth-of-type(6) {
    top: 470px;
    transition-delay: .20s
  }

  .pc_header {
    background-color: #ffba00;
    height: 50px;
    position: inherit;

    .pc_header_content {
      width: 96%;
      margin: 0 auto;
      position: relative;

      .header_content_logo {
        line-height: 50px;

        img {
          width: 90px;
        }
      }

      .header_content_right {
        position: absolute;
        left: 0;
        width: 100%;

        .header_content_phone {
          display: none;
        }

        .menu {
          width: 100%;
          padding: 0 20px;
          background: #fff;

          ul li {
            height: 0;
            margin-right: 0;
            width: 100%;
          }
        }

        .menu.on ul li {
          height: auto;
        }

        .menu ul li:last-child span {
          border-bottom: 0;
        }

        .menu ul li .menu_title {
          width: 100%;
          line-height: 44px;
          color: #ff7019;
          font-weight: bolder;
          cursor: pointer;
        }

        .menu ul li .menu_title:before {
          display: none;
        }
      }
    }
  }


  .pc_header .pc_header_content .header_content_right .menu ul li .DropDown {
    opacity: 1;
    top: 0;
    position: fixed;
    height: 100%;
    -webkit-transform: scale(0) !important;
    -moz-transform: scale(0) !important;
    -ms-transform: scale(0) !important;
    -o-transform: scale(0) !important;
    //filter: scale(0) !important;
    //filter: transform;
    transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
  }

  .pc_header .pc_header_content .header_content_right .menu ul li .DropDown .DropDown_content {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .pc_header .pc_header_content .header_content_right .menu ul li .DropDown a {
    width: 100%;
  }

  .pc_header .pc_header_content .header_content_right .menu ul li:hover .DropDown .DropDown_close {
    display: block;
  }

}

.fl {
  float: left;
}

.fr {
  float: right;
}

li {
  list-style: none;
}


span {
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  color: #555555;
  font-size: 13px;
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  -moz-transition: all 0.5s ease 0s;
}

span:hover {
  text-decoration: none;
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  -moz-transition: all 0.5s ease 0s;
}

a {
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  color: #555555;
  font-size: 13px;
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  -moz-transition: all 0.5s ease 0s;
}

a:hover {
  text-decoration: none;
  transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  -moz-transition: all 0.5s ease 0s;
}

img {
  vertical-align: middle;
}

ul {
  padding: 0;
  margin: 0;
  border: 0;
}

.disnone {
  display: none;
}
</style>
