<template>
  <div class="IndexService">
    <div class="IndexService_content all wow fadeIn">
      <div class="IndexService_content_title">
        <dd>服务项目 / SERVICE Items</dd>
        <dt>专业团队打造精品网站</dt>
      </div>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="content_body_list">
          <div class="body_list_title">web前端网站搭建</div>
          <div class="body_list_content">一键注册开通网站，海量网站模板可供选择，丰富的功能控件可拖拽式自由操作，快捷编辑，网站即可生成预览</div>
          <div class="body_list_classification">
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
          </div>

        </swiper-slide>
        <swiper-slide class="content_body_list">
          <div class="body_list_title">web前端网站搭建</div>
          <div class="body_list_content">一键注册开通网站，海量网站模板可供选择，丰富的功能控件可拖拽式自由操作，快捷编辑，网站即可生成预览</div>
          <div class="body_list_classification">
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
          </div>

        </swiper-slide>
        <swiper-slide class="content_body_list">
          <div class="body_list_title">web前端网站搭建</div>
          <div class="body_list_content">一键注册开通网站，海量网站模板可供选择，丰富的功能控件可拖拽式自由操作，快捷编辑，网站即可生成预览</div>
          <div class="body_list_classification">
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
          </div>

        </swiper-slide>
        <swiper-slide class="content_body_list">
          <div class="body_list_title">web前端网站搭建</div>
          <div class="body_list_content">一键注册开通网站，海量网站模板可供选择，丰富的功能控件可拖拽式自由操作，快捷编辑，网站即可生成预览</div>
          <div class="body_list_classification">
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
            <div class="list_classification_list">
              <dd class="iconfont">&#xe60a;</dd>
              <dt>企业官网</dt>
            </div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: true
        },
      }
    }
  }
}
</script>

<style scoped lang="scss">
.IndexService {
  background: #f6f6f6;

  .IndexService_content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 75px 0;

    &_title {
      text-align: center;
      padding-bottom: 55px;

      dd {
        font-size: 2rem;
        color: #333333;
        text-transform: uppercase;
      }

      dt {
        font-size: 1rem;
        color: #999999;
        margin-top: 12px;
        line-height: 28px;
      }
    }
  }

  .content_body_list {
    background: url(../assets/images/bn2.png) no-repeat 100% 50%;
    padding: 0 25px;
    width: 100%;
    box-sizing: border-box;

    .body_list_title {
      font-size: 20px;
      color: #333333;
      text-align: center;
      margin-bottom: 15px;
    }

    .body_list_content {
      font-size: 13px;
      color: #666666;
      text-align: center;
      line-height: 26px;
    }

    .body_list_classification {
      padding-top: 35px;
      text-align: center;

      .list_classification_list {
        width: 50%;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        padding: 20px 0;
        float: left;

        dd {
          color: #222222;
          font-size: 28px;
          transition: all 0.5s ease;
          margin: 0;
        }

        dt {
          color: #333;
          font-size: 14px;
          margin-top: 10px;
          transition: all 0.5s ease;
        }
      }

      .list_classification_list:nth-child(2n) {
        border-right: 0;
      }

      .list_classification_list:nth-child(1) {
        padding-top: 10px;
      }

      .list_classification_list:nth-child(2) {
        padding-top: 10px;
      }

      .list_classification_list:nth-child(3) {
        padding-bottom: 10px;
        border-bottom: 0;
      }

      .list_classification_list:nth-child(4) {
        padding-bottom: 10px;
        border-bottom: 0;
      }
    }
  }

  .content_body_list:first-child {
    padding-left: 0;
  }

  .content_body_list:last-child {
    padding-right: 0;
    background: none;
  }
}
</style>
