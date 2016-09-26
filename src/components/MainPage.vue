<template>
  <div id="main-page">
    <slide :content="topStories"></slide>  
    <daily-story :today="stories"></daily-story>
  </div>
</template>

<script>
  import Slide from "./Slide"
  import DailyStory from "./DailyStory"
  import { getTopStories, getTodayStories } from '../vuex/getters'

  export default {
    data() {
      return {
        topStories: [],
        stories: [],
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
      }
    },
    ready() {
      this.topStories = this.getTopStories;
      this.stories = this.getTodayStories;
      this.topStories.reverse();
      this.topStories.forEach(function (entry) {
        entry.image = entry.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
      }),
      this.stories.forEach(function (entry) {
        entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
      })
    },
  }
</script>

<style lang="scss" scoped>
  #main-page {
    width: 100%;
    overflow: hidden;
  }
</style>