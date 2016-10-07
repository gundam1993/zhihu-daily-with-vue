<template>
  <div id="about">
    <sidebar :title="'关于'"></sidebar>
    <div class="about-block">
      <img src="http://tva2.sinaimg.cn/crop.518.65.901.901.180/b2f93831jw8evp8z6co3vj21gx0ts4c2.jpg">
      <h4>知乎日报 with Vue</h4>
      <p>by gundam1993</p>
      <ul>
        <li>
          <a href="https://github.com/gundam1993/zhihu-daily-with-vue">项目github地址</a>
        </li>
        <li>喜欢的话</li>
        <li>给一个star好吗</li>
        <li>(❤ ω ❤)</li>
      </ul>
      <div class="return" v-link="'/index'">
        返回
      </div>
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
      margin: 2rem 0 1rem 0;
    }

    p {
      padding: 0 0.5rem;
    }
    
    ul {
      margin: 1rem auto;
    }

    li {
      height: 2rem;
      width: 40%;
      line-height: 2rem;
      border-bottom: 1px solid #ccc;
      margin: auto;
      list-style-type: none; 
      color: #999;
      user-select: none;
    }

    a {
      display: block;
      color: #2482ab;
      text-decoration: none;
    }

    .return {
      height: 2rem;
      line-height: 2rem;
      width: 30%;
      border: 1px solid #aaa;
      border-radius: 5px;
      margin: auto;
      margin-bottom: 3rem;
    }
  }
</style>