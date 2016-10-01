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
  src: url('//at.alicdn.com/t/font_1475292202_236586.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475292202_236586.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475292202_236586.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475292202_236586.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475292202_236586.eot')\0; /* ie8 fix */

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
