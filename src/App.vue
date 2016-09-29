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
  src: url('//at.alicdn.com/t/font_1475143321_5706582.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475143321_5706582.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475143321_5706582.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475143321_5706582.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475143321_5706582.eot')\0; /* ie8 fix */

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
