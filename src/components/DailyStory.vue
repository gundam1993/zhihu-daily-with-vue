<template>
  <div id="daily-story">
  <span>今日热闻</span>
    <div class="daily-story-block" 
         v-for="story in today"
         @touchstart="touching"
         @touchEnd="touchEnd">
      <h4>{{ story.title }}</h4>
      <div class="daily-story-pic">
        <img :src="story.images[0]" alt="">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
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
      }
    }
  }
</style>
