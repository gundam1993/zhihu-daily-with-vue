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
  src: url('//at.alicdn.com/t/font_1475133678_0832474.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475133678_0832474.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475133678_0832474.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475133678_0832474.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475133678_0832474.eot')\0; /* ie8 fix */

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
