<template>
  <div class="home">
    <headMenu/>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        class="swiper-slide"
        v-for="i in 10"
        :key="i">
        <img
          src="http://demo.mxyhn.xyz:8020/cssthemes6/12.29ZF11/images/index_banner.jpg"
          alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <IndexService></IndexService>
    <div class="main-product" style="background-color: #fff">
      <div class="layui-container">
        <p class="title">专为无代码而研制的<span>核心产品</span></p>
        <div class="layui-row layui-col-space25">
          <div class="layui-col-sm6 layui-col-md3 ">
            <div class="content">
              <div><img src="res/static/img/Big_icon1.png"></div>
              <div style="height: 200px;">
                <p class="label">前端拖拽式无代码平台</p>
                <p>海量模板、组件供选择，自由拖拽，自由定义，快速搭建网站</p>
              </div>
              <a href="javascript:;">敬请期待</a>
            </div>
          </div>
          <div class="layui-col-sm6 layui-col-md3 ">
            <div class="content">
              <div><img src="res/static/img/Big_icon2.png"></div>
              <div style="height: 200px;">
                <p class="label">后端组件式低代码平台</p>
                <p>丰富逻辑组件选择，集成微信、钉钉等多个第三方平台、可视化流程图形式展示、修改更迅速、管理更轻松</p>
              </div>
              <a href="javascript:;">查看产品 ></a>
            </div>
          </div>
          <div class="layui-col-sm6 layui-col-md3 ">
            <div class="content">
              <div><img src="res/static/img/Big_icon3.png"></div>
              <div style="height: 200px;">
                <p class="label">移动端拖拽式无代码平台</p>
                <p>海量模板、组件供选择，自由拖拽，自由定义，快速搭建应用。</p>
              </div>
              <a href="javascript:;">敬请期待</a>
            </div>
          </div>
          <div class="layui-col-sm6 layui-col-md3 ">
            <div class="content">
              <div><img src="res/static/img/Big_icon4.png"></div>
              <div style="height: 200px;">
                <p class="label">嵌入式可视化开发平台</p>
                <p>从MCU程序设计，逐步扩展到PCB布线及优化，最终实现硬件物联网设备设计及制造</p>
              </div>
              <a href="javascript:;">敬请期待</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headMenu from "@/components/headMenu";
import IndexService from "@/components/IndexService";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import 'swiper/css/swiper.css'

export default {
  components: {
    IndexService,
    headMenu,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {

  height: 920px;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    background-color: white;
  }
}
/*主体—产品*/
.main-product{padding-top: 90px; padding-bottom: 130px;}
.main-product p{font-size: 16px; color: #ababab; line-height: 28px;}
.main-product p.title
,.main-service p.title{color: #484848; font-size: 24px; text-align: center; line-height: 160px;}
.main-product p.title span
,.main-service p.title span{color: #2db5a3;font-size: 48px}
.main-product .content{border: 1px solid #DEDEDE; padding: 30px 36px 0 36px; text-align: center; transition: 0.3s;}
.main-product .content p.label{font-size: 18px; color: #939393; line-height: 46px; padding-top: 6px;}
.main-product .content a{font-size: 18px; color: #a1d8cb; line-height: 68px;}
.main-product .content:hover{box-shadow: 0 0 3px 3px #EEE; transition: 0.3s;}
.main-product .content img{transition: 2s;}
.main-product .content img:hover{transform: rotateY(180deg);}
</style>


