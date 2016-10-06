<template>
  <div id="sidebar">
    <div class="sidebar-main">
      <i class="iconfont icon-menu" @click="toggleSidebar()"></i>
        <span v-if="this.$route.path === '/index'">首页</span>
        <span v-else>{{ title }}</span>
    </div>
    <div class="sidebar-mask" 
         :class="{'sidebar-block-hide': hide}"
         @click="showSidebar()"></div>
    <div class="sidebar-block" :class="{'sidebar-block-hide': hide}">
      <div class="sidebar-homepage">
        <div class="sidebar-about" @click="toggleSidebar()">
          <img src="http://tva2.sinaimg.cn/crop.518.65.901.901.180/b2f93831jw8evp8z6co3vj21gx0ts4c2.jpg">
          <span>gundam1993</span>
        </div>
        <div @click="toggleSidebar()" v-link="'/index'">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </div>
      </div>
      <div v-for="topic in topics" 
           class="sidebar-topics"
           v-link="{name: 'theme', params: { themeId: topic.id }}" 
           @click="toggleSidebar()">
          {{ topic.name }}
          <i class="iconfont icon-jiahao"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        topics: [],
        hide: true,
      }
    },
    props: {
      title: {
        type: String,
        default: function () {
          return "";
        },
      },
    },
    methods: {
      toggleSidebar() {
        this.hide = !this.hide;
      },
    },
    ready() {
      this.$http.get("/api/4/themes").then(function (response) {
        this.topics = response.body.others;
      });
    }
  }
</script>

<style lang="scss" scoped>
  #sidebar {
    height: 2rem;
    color: #FFF;
    background-color:#111;

    .sidebar-main {
      height: 2rem;
      line-height: 2rem;

      i {
        font-size: 1rem;
        margin: 0 0.5rem;
      }
    }

    .sidebar-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1000;
    }

    .sidebar-block{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 65%;
      background-color: #FFF;
      margin: 0;
      z-index: 10000;
      transition: all 0.3s ease-in-out;
      overflow: auto;

      .sidebar-homepage {
        color: #FFF;
        width: 100%;
        box-sizing: border-box;
        line-height: 2rem;
        font-size: 1rem;
        background-color: #111;
        padding: 0.5rem 0 0 0.5rem;

        .sidebar-about {
          height: 2rem;
          width: 100%;
          line-height: 3rem;

          img {
            height: 2rem;
            width: 2rem;
            border-radius: 1rem;
          }

          span {
            font-size: 1rem;
            color: #fff;
            position: absolute;
            top: 0;
            left: 3rem;
          }
        }

        .iconfont {
          font-size: 1rem;
          margin: 0 0.5rem;
        }
      }

      .sidebar-topics {
        display: block;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        color: #000;
        padding-left: 1rem;
        box-sizing: border-box;
        background-color: #FFF;
        position: relative;
        border: none;
        font-size: 0.8rem;

        i {
          position: absolute;
          right: 1rem;
          font-size: 1rem;
        }
      }
    }
  }  

  .sidebar-block-hide {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
</style>