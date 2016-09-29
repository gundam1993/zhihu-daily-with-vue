<template>
  <div id="page-controller">
    <div class="page-controller-btn-big"
         :class="{'page-controller-rotate': !hide}"
         @click="toggleMune">
      <i class="iconfont icon-jiahao"></i>
    </div>
    <div class="page-controller-memu" :class="{'page-controller-hide': hide}">
      <ul>
        <li>
          <div class="page-controller-btn-small"></div>
        </li>
        <li>
          <div class="page-controller-btn-small"></div>
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
      }
    },
    methods: {
      toggleMune() {
        this.hide = !this.hide;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #page-controller {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
  }

  .page-controller-btn-big {
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

    .icon-jiahao {
      font-size: 1rem;
    }
  }
  
  .page-controller-mask{
    height: 100%;
    width: 100%;
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

      .page-controller-btn-small {
        height: 2rem;
        width: 2rem;
        background-color: #FFF;
        border-radius: 1rem;
        box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.4);
        margin: 0.5rem 0 0.2rem 0.2rem;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .page-controller-hide {
    transform: translateY(200%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .page-controller-mask-hide {
    opacity: 0;
    transition: all 0.3s ease;
  }

  .page-controller-rotate {
    transform: rotate(135deg);
    box-shadow: 0.1rem 0 0.3rem rgba(0, 0, 0, 0.6);
  }
</style>