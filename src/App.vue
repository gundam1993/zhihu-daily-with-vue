<template>
  <div>
    <router-view v-if="readyState"></router-view>
  </div>
</template>

<script>
  import store from './vuex/store';
  import Slide from './components/Slide'
  import { initStore } from './vuex/actions'; 

  export default {
    store,
    vuex: {
      actions: {
        initStore,
      }
    },
    components: {
      Slide,
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
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
