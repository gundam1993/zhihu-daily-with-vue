<template>
  <div id="daily-story">
  <span>今日热闻</span>
    <div class="daily-story-block" 
         v-for="story in today"
         @touchstart="touching"
         @touchEnd="touchEnd"
         @click="setNowWatching(story.id)">
      <h4>{{ story.title }}</h4>
      <div class="daily-story-pic" v-if="story.images">
        <img :src="story.images[0]" alt="">
        <div class="daily-story-multipic"
             v-if="story.multipic">
          <i class="iconfont icon-duotu"></i>
        多图</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { setNowWatching } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        setNowWatching,
      }
    },
    props: {
      today: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    methods: {
      touching() {
        if (event.target.className === "daily-story-block") {
          event.target.id = "touching";
        }else {
          event.target.parentNode.id = "touching"
        }
      },
      touchEnd() {
        var touch = document.getElementById('touching');
        touch.id = "";
      }
    }
  }
</script>

<style lang="scss" scoped>
  #daily-story {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    background-color: #eee;
    box-sizing: border-box;
    position: flex;
    flex-direction: column;
    justify-content: center;
    
    span {
      font-size: 16px;
      color: #aaa;
      font-weight: lighter;
      display: block;
      margin-left: 1.5rem;
      user-select: none;
    }
    
    #touching {
      background-color: #ddd;
    }

    .daily-story-block {
      width: 90%;
      min-height: 6.5rem;
      padding: 0.75rem;
      margin: 0.5rem 1rem;
      background-color: #FFF;
      border: 1px solid #ccc;
      box-shadow: 0.05rem 0.05rem 0.1rem #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      position: relative;
      transition: all 0.2s ease;

      h4 {
        display: block;
        text-align: left;
        width: 65%;
      }

      .daily-story-pic {
        height: 5rem;
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;

        img {
          height: 100%;
        }

        .daily-story-multipic {
          background-color: rgba(0, 0, 0, 0.7);
          color: #FFF;
          font-size: 12px;
          width: 40%;
          text-align: center;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 0.2rem;
        }
      }
    }
  }
</style>
