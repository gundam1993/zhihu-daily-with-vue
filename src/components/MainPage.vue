<template>
  <div>
    <slide :content="topStories"></slide>
  </div>
</template>

<script>
  import Slide from "./Slide"
  import { getTopStories } from '../vuex/getters'

  export default {
    data() {
      return {
        topStories: [],
      }
    },
    components: {
      Slide,
    },
    vuex: {
      getters: {
        getTopStories,
      }
    },
    methods: {
      fixImgUrl(imgUrl) {
        return imgUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
      }
    },
    ready() {
      this.topStories = this.getTopStories;
      this.topStories.reverse();
      this.topStories.forEach(function (entry) {
        entry.image = entry.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
      })
    },
  }
</script>

<style lang="scss" scoped>
  
</style>