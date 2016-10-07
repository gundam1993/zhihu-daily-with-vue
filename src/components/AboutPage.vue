<template>
  <div id="about">
    <sidebar :title="'关于'"></sidebar>
    <div class="about-block">
      <img src="http://tva2.sinaimg.cn/crop.518.65.901.901.180/b2f93831jw8evp8z6co3vj21gx0ts4c2.jpg">
    </div>
  </div>
</template>

<script>
  import Sidebar from "./Sidebar";

  export default {
    components: {
      Sidebar,
    }
  }
</script>

<style lang="scss" scoped>
  .about-block {
    width: 100%;
    text-align: center;

    img {
      width: 6rem;
      height: 6rem;
      border-radius: 3rem;
      margin-top: 2rem;
    }
  }
</style>