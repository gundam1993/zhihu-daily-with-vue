<template>
  <div id="story-dsiplay">
    12312312
  </div>
</template>

<script>
  import { getNowWatching } from "../vuex/getters";

  export default {
    data() {
      return {
        content: {},
        readyState: false,
      }
    },
    vuex: {
      getters: {
        id: getNowWatching,
      }
    },
    ready() {
      console.log(this.id);
      var source = '/api/4/news/' + this.id;
      this.$http.get(source).then(function (response) {
        this.content = response;
        this.readyState = false;
      })
    }
  }
</script>