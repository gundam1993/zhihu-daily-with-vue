<template>
  <div id="main-page" @scroll="loadOld()">
    <slide :content="topStories"></slide>  
    <daily-story :stories="todayStories"></daily-story>
    <daily-story v-for="story in oldStories" 
                 :stories="story.stories" 
                 :title="story.date"></daily-story>
    <div class="main-page-error" v-show="errorBlock">
      <div class="error-block">
        <h4>似乎出了点问题...</h4>
        <div class="error-btn" @click="loadOld()">重新加载</div>
        <div class="error-btn" @click="ignoreError()">忽略</div>
        <div class="error-icon">
          <i class="iconfont icon-signalwifioff"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slide from "./Slide";
  import DailyStory from "./DailyStory";
  import { getTopStories, getTodayStories, getLoadingStr, getOldStories, getScrollHeight } from '../vuex/getters';
  import { setLoadingStr, addOldStories } from "../vuex/actions"

  export default {
    data() {
      return {
        topStories: [],
        todayStories: [],
        oldStories: [],
        date: "",
        scrollHeight: 0,
        errorBlock: true,
      }
    },
    components: {
      Slide,
      DailyStory,
    },
    vuex: {
      getters: {
        getTopStories,
        getTodayStories,
        getLoadingStr,
        getOldStories,
        getScrollHeight,
      },
      actions: {
        setLoadingStr,
        addOldStories,
      }
    },
    methods: {
      clearStyle() {
        var style = document.getElementById('storyCss');
        if (style) {
          style.remove();
        }
      },
      imageUrlFix() {
        this.topStories.forEach(function (entry) {
          entry.image = entry.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        });
        this.todayStories.forEach(function (entry) {
          entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        });
      },
      returnDay(date) {
        var day = new Date(date.slice(0,4), parseInt(date.slice(4,6)) - 1, date.slice(6));
        switch(day.getDay()) {
          case 0 :
            return "日";
            break;
          case 1 :
            return "一";
            break;
          case 2 :
            return "二";
            break;
          case 3 :
            return "三";
            break;
          case 4 :
            return "四";
            break;
          case 5 :
            return "五";
            break;
          case 6 :
            return "六";
            break;
        }
      },
      loadOld() {
        if (document.body.scrollHeight - window.scrollY < 1500) {
          window.removeEventListener("scroll", this.loadOld)
          this.$http.get(this.getLoadingStr).then(function (response) {
            response.body.stories.forEach(function (entry) {
              entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
            });
            response.body.date = response.body.date.slice(4,6) + "月" + response.body.date.slice(6)  + "日 星期" + this.returnDay(response.body.date);
            this.addOldStories(response.body);
            this.setLoadingStr();
            window.addEventListener("scroll", this.loadOld);
          })
        }
      },
      ignoreError() {
        this.errorBlock = !this.errorBlock;
      },
    },
    
    ready() {
      this.topStories = this.getTopStories;
      this.todayStories = this.getTodayStories;
      this.oldStories = this.getOldStories;
      this.scrollHeight = this.getScrollHeight;
      this.imageUrlFix();
      this.clearStyle();
      if (this.getLoadingStr === "") {
        this.setLoadingStr();
      }
      window.addEventListener("scroll", this.loadOld);
      setTimeout(function() {
        window.scrollTo(0, this.scrollHeight);
      }.bind(this),100)
    },
  }
</script>

<style lang="scss" scoped>
  #main-page {
    width: 100%;
    overflow: hidden;
    font-family: "Helvetica Neue", Ubuntu, "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  }

  .main-page-error {
    width: 100%;
    background-color: #eee;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .error-block {
      width: 90%;
      height: 6.5rem;
      padding: 0.75rem;
      background-color: #FFF;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      box-shadow: 0.05rem 0.05rem 0.1rem #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      position: relative;

      .error-btn {
        font-size: 0.8rem;
        width: 4rem;
        text-align: center;
        color: #0089A7;
        display: inline-block;
        padding-right:  0.5rem;
        margin-top: 1.5rem;
      }

      .error-icon {
        float: right;
        height: 5rem;
        width: 5rem;
        background-color: #999;
        color: #FFF;
        border-radius: 2.5rem;
        text-align: center;
        line-height: 5rem;
        position: absolute;
        top: 0.6rem;
        right: 1rem;

        .iconfont {
          font-size: 3rem;
        }
      }
    }
  }
</style>