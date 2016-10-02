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
  src: url('//at.alicdn.com/t/font_1475384940_893363.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475384940_893363.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475384940_893363.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475384940_893363.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475384940_893363.eot')\0; /* ie8 fix */

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
