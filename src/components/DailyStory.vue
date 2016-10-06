<template>
  <div class="daily-story">
  <span>{{ title }}</span>
    <div class="daily-story-block" 
         v-for="story in stories"
         @touchstart="touching"
         @touchEnd="touchEnd"
         @click="tap(story.id)">
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
  import { setNowWatching,setScrollHeight } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        setNowWatching,
        setScrollHeight,
      }
    },
    props: {
      stories: {
        type: Array,
        default: function () {
          return [];
        },
      },
      title: {
        type: String,
        default: function () {
          return '今日热闻';
        }
      }
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
        if (touch) {
          touch.id = "";
        }
      },
      tap(id) {
        this.setNowWatching(id);
        this.$route.router.go('/story/' + id);
        this.setScrollHeight(window.scrollY);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .daily-story {
    width: 100%;
    height: 100%;
    padding-top: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    
    span {
      font-size: 16px;
      color: #888;
      font-weight: lighter;
      display: block;
      width: 90%;
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
      background-color: #FFF;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      box-shadow: 0.05rem 0.05rem 0.1rem #ccc;
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
          min-width: 2rem;
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
