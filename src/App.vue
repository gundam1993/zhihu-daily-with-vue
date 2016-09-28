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

  export default {
    store,
    vuex: {
      actions: {
        initStore,
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
  src: url('//at.alicdn.com/t/font_1474875319_7799253.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1474875319_7799253.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1474875319_7799253.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1474875319_7799253.svg#iconfont') format('svg'); /* iOS 4.1- */
  src: url('//at.alicdn.com/t/font_1474875319_7799253.eot')\0; /* ie8 fix */

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
