<template>
  <div id="slide">
    <div id="slide-container" ref="slideContainer">
      <div v-for="data in content" 
           class="slide-box" 
           @touchstart="setTouchX()" 
           @touchmove="touchMove()"
           @touchend="touchEnd()"
           @click="tap(data.id)">
        <img :src="data.image" alt="">
        <h3>{{ data.title }}</h3>
      </div>
    </div>
    <div class="slide-pointers">
      <div v-for="data in content" class="slide-ponit"></div>
      <div id="slide-ponit-display" ref="slidePoint"></div>
    </div>
  </div>
</template>

<script>
  import { setNowWatching } from '../vuex/actions'

  export default {
    data() {
      return {
        touchX : 0,
        index: 0,
        left: 0,
        movelength: 0,
        loop: "",
      }
    },
    vuex: {
      actions: {
        setNowWatching,
      },
    },
    props: {
      content: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    methods: {
      setTouchX() {
        this.touchX = event.touches[0].clientX;
        this.endLoop();
      },

      touchMove() {
        var target = event.target.parentNode.parentNode,
            distance = event.touches[0].clientX -this.touchX,
            result = -this.left + distance;
        if (this.left === 0 && distance > 0) {
          distance = 0;
        }else if (this.left === 4 * document.body.offsetWidth && distance < 0) {
          distance = 0;
        }else{
          target.style.transform = "translateX(" + result + "px)";
        }
        this.movelength = distance;
      },
      touchEnd() {
        this.startLoop();
        if (this.movelength > (document.body.offsetWidth / 2)) {
            this.index -= 1;
          }else if (this.movelength < (-document.body.offsetWidth / 2)) {
            this.index += 1
          }
          this.movelength = 0;
        this.left = this.index * document.body.offsetWidth;
        var target = event.target.parentNode.parentNode;
        target.style.transform = "translateX(-" + this.left + "px)";
        this.$refs.slidePoint.style.transform = "translateX(" + this.index * 0.6 + "rem)";
      },
      slideMove() {
        this.index === 4 ? this.index = 0 : this.index ++;
        this.left = this.index * document.body.offsetWidth;
        this.$refs.slideContainer.style.transform = "translateX(-" + this.left + "px)";
        this.$refs.slidePoint.style.transform = "translateX(" + this.index * 0.6 + "rem)";
      },
      startLoop() {
        this.loop = setInterval(this.slideMove, 6300);
        this.$refs.slideContainer.className = "transition";
        this.$refs.slidePoint.className = "transition";
      },
      endLoop() {
        window.clearInterval(this.loop);
        this.$refs.slideContainer.className = "";
        this.$refs.slidePoint.className = "";
      },
      tap(id) {
        this.setNowWatching(id);
        this.endLoop();
        this.$router.push('/story/' + id);
      }
    },
    mounted: function() {
      this.$nextTick(function () {
        this.startLoop();
      })
    },
    beforeDestroy() {
      this.endLoop();
    }
  }
</script>

<style lang="scss" scoped>
  .transition {
    transition: transform 0.3s ease-in-out;
  }

  #slide {
    position: relative;
    height: 11rem;

    #slide-container {
      width: 500%;
      height: 100%;
      display: flex;
      flex-direction: row-reverse;
      -webkit-overflow-scrolling: touch;
    }

    .slide-box {
      width: 20%;
      height: 100%;
      z-index: 1;
      position: relative;

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