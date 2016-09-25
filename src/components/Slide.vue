<template>
  <div id="slide">
      <div v-for="data in content" class="slide-box">
        <img :src="data.image" alt="">
        <h3>{{ data.title }}</h3>
      </div>
    <div class="slide-pointers">
      <div v-for="data in content" class="slide-ponit"></div>
      <div id="slide-ponit-display"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      content: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    methods: {
      slideMove() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  #slide {
    width: 100%;
    height: 13rem;
    position: relative;

    .slide-box {
      width: 100%;;
      height: 13rem;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
        object-fit: cover;
        object-position: center;
        -webkit-filter: brightness(0.75);
        -moz-filter: brightness(0.75);
        -o-filter: brightness(0.75);
        -ms-filter: brightness(0.75);
        filter: brightness(0.75);
      }

      h3 {
        position: absolute;
        left: 0;
        bottom: 1.5rem;
        color: #FFF;
        padding: 0 1rem;
      }
    }

    .slide-pointers {
      position:absolute;
      bottom: 0.5rem;
      left: calc(50% - 1.5rem);
      height: 1rem;
      text-align: center;
      z-index: 1000;

      .slide-ponit {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.2rem;
        background-color: #aaa;
        float: left;
        margin: 0.3rem 0.1rem;
        z-index: 1;
      }

      #slide-ponit-display {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.2rem;
        background-color: #FFF;
        position:absolute;
        top: 0.3rem;
        left: 0.1rem;
        z-index: 10;
      }
    }
  }
</style>