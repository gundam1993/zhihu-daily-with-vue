<template>
  <div id="editors-block">
    <sidebar :title="'主编'"></sidebar>
    <ul>
      <li v-for="editor in editors">
        <a :href="'http://news-at.zhihu.com/api/4/editor/' + editor.id + '/profile-page/android'">
          <img :src="editor.avatar">
          <div class="info">
            <p class="name">{{ editor.name }}</p>
            <p class="bio">{{ editor.bio }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Sidebar from "./Sidebar";
  import { getEditors } from "../vuex/getters";

  export default {
    data() {
      return {
        editors: [],
      }
    },
    components: {
      Sidebar,
    },
    vuex: {
      getters: {
        getEditors,
      }
    },
    ready() {
      console.log(this.getEditors)
      if (this.getEditors.length) {
        this.editors = this.getEditors;
      }else{
        this.editors = JSON.parse(sessionStorage.getItem("editors"));
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 0 1rem;

    a {
      width: 100%;
      height: 100%;
      color: #000;
      text-decoration: none;
    }

    li {
      height: 3rem;
      list-style-type: none;
      border-bottom: 1px solid #ccc;
      display: block;
      position: relative;
      padding: 0.5rem 0;

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        display: block;
        position: absolute;
        top: 0.5rem;
        left: 0;
      }

      .info {
        position: absolute;
        top: 0.5rem;
        left: 3.5rem;

        .name {
          font-size: 0.8rem;
          font-weight: bolder;
        }
        .bio {
          font-size: 0.8rem;
          color: #888;
        }
      }
    }
  }
</style>