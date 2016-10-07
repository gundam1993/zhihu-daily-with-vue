<template>
  <div id="page-controller">
    <div id="page-controller-btn-big"
         :class="{'page-controller-rotate': !hide, 'page-controller-hide': controllerHide}"
         v-el:controller-btn
         @click="toggleMenu">
      <i class="iconfont icon-jiahao"></i>
    </div>
    <div class="page-controller-memu" :class="{'page-controller-hide': hide}">
      <ul>
        <li>
          <div class="page-controller-text">赞同数：{{content.popularity}}</div>
          <div class="page-controller-btn-small"
               :class="{'page-controller-agreed': agreed}" 
               @click="agree()">
            <i class="iconfont icon-plusone"></i>
          </div>
        </li>
        <li>
          <div class="page-controller-text">评论数：{{content.comments}}</div>
          <div class="page-controller-btn-small" @click="showComment()">
            <i class="iconfont icon-comment"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="page-controller-mask" :class="{'page-controller-mask-hide': hide}"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hide: true,
        scrollY: 0,
        controllerHide: false,
        agreed: false,
      }
    },
    props: {
      content: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    methods: {
      toggleMenu() {
        this.hide = !this.hide;
      },
      agree() {
        if (!this.agreed) {
          this.content.popularity += 1;
        }else{
          this.content.popularity -= 1;
        }
        this.agreed = !this.agreed;
      },
      showComment() {
        this.$route.router.go(this.$route.path.replace(/story/, "comment"));
      },
      toggleBtn() {
        if (window.scrollY >= this.scrollY && this.$els.controllerBtn.className === "") {
          this.controllerHide = true;
        }else if (window.scrollY < this.scrollY && this.$els.controllerBtn.className === "page-controller-hide") {
          this.controllerHide = false;
        };
        this.scrollY = window.scrollY;
      }
    },
    ready() {
      window.onscroll = this.toggleBtn.bind(this);
    },
    beforeDestroy() {
      window.onscroll = "";
    },
  }
</script>

<style lang="scss" scoped>

  i {
      font-size: 1rem;
    }

  #page-controller-btn-big {
    position: fixed;
    right: 0.7rem;
    bottom: 0.7rem;
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    line-height: 2.5em;
    border-radius: 1.5rem;
    color: #FFF;
    background-color: #D75455;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.6);
    transition: all 0.3s ease-in-out;
    z-index: 1000;

    &:active {
      background-color: #dc696a;
      transition: all 0.3s ease-in-out;
    }
  }
  
  .page-controller-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease-in-out;
  }

  .page-controller-memu {
    position: fixed;
    bottom: 4rem;
    right: 0.95rem;
    z-index: 100;
    transition: all 0.3s ease-in-out;
    transform: translateY(0%);

    li {
      list-style: none;
      text-align: right;

      .page-controller-text {
        height: 1.5rem;
        font-size: 0.7rem;
        font-weight: bold;
        background-color: #FFF;
        border-radius: 0.1rem;
        text-align: center;
        line-height: 1.5rem;
        display: inline-block;
        padding: 0 0.3rem;
        box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.4);
        margin: 0.5rem 0 0.2rem 0.2rem;
      }

      .page-controller-btn-small {
        height: 2rem;
        width: 2rem;
        display: inline-block;
        background-color: #FFF;
        border-radius: 1rem;
        text-align: center;
        line-height: 2rem;
        box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.4);
        margin: 0.5rem 0 0.2rem 0.2rem;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .page-controller-hide {
    transform: translateY(200%);
    opacity: 0;
    transition: all 0.5s ease;
  }

  .page-controller-mask-hide {
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }
  
  .page-controller-agreed {
    color: #FFB11B;
  }

  .page-controller-rotate {
    transform: rotate(135deg);
    box-shadow: 0.1rem 0 0.3rem rgba(0, 0, 0, 0.6);
  }
</style>