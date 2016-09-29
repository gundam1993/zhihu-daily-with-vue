<template>
  <div>
    <router-view v-if="readyState"
                 transition="page-change"
                 transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  import store from './vuex/store';
  import { initStore } from './vuex/actions';
  import { getScrollHeight } from './vuex/getters';

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
  font-family: 'Helvetica Neue', Helvetica, Arial, Sans-serif;
}



@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1475041951_2002075.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1475041951_2002075.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1475041951_2002075.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1475041951_2002075.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1475041951_2002075.eot')\0; /* ie8 fix */

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

</style>
