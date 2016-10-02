<template>
  <div class="main">
    <loading-page v-if="!readyState" transition="loading-change"></loading-page>
    <router-view v-if="readyState"
                 transition="page-change"
                 transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  import store from './vuex/store';
  import { initStore } from './vuex/actions';
  import { getScrollHeight } from './vuex/getters';
  import LoadingPage from './components/LoadingPage';

  export default {
    store,
    vuex: {
      actions: {
        initStore,
      },
      getters: {
        getScrollHeight,
      }
    },
    components: {
      LoadingPage,
    },
    data() {
      return {
        readyState: false,
      }
    },
    methods: {
      getStory() {
        this.$http.get("/api/4/news/latest").then(function (response) {
          this.initStore(response);
          this.readyState = true;
        })
      }
    },
    ready() {
      this.getStory();
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  width: 100%;
  height: 100%;
  font-size:20px;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Ubuntu, "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif
}
body {
  height: 100%;
}

.main {
  height: 100%;
}

@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1475407341_1027098.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475407341_1027098.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475407341_1027098.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475407341_1027098.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475407341_1027098.eot')\0; /* ie8 fix */

}
.iconfont {
  font-family:"iconfont" !important;
  font-size:12px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.icon-duotu:before { content: "\e601"; }
.icon-iconfontjiantou1:before { content: "\e600"; }
.icon-loading:before { content: "\e602"; }
.icon-jiahao:before { content: "\e603"; }
.icon-plusone:before { content: "\e604"; }
.icon-comment:before { content: "\e605"; }
.icon-signalwifioff:before { content: "\e606"; }
.icon-like:before { content: "\e607"; }
.icon-weekend:before { content: "\e608"; }

.page-change-transition {
    transition: all .4s ease-in-out;
  }
  
  .page-change-enter {
    opacity: 0;
  }
  .page-change-leave {
    transform: translate(-100%,0);
    opacity: 0;
  } 

  .loading-change-transition {
    transition: all .6s ease-in-out;
  }
  
  .loading-change-enter {
    opacity: 0;
  }
  .loading-change-leave {
    opacity: 0;
  }

</style>
