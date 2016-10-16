<template>
  <div id="theme-page">
    <sidebar :title="content.name"></sidebar>
    <div class="theme-title-container">
        <img :src="content.image">
        <h3>{{ content.description }}</h3>
        <span v-if="content.image_source">{{ content.image_source }}</span>
    </div>
    <router-link to="/editors">
      <div class="theme-editors" v-if="content.editors">
        <span>主编</span>
        <div class="theme-editors-avatar"
             v-for="editor in content.editors">
          <img :src="editor.avatar">       
        </div>
      </div>
    </router-link>
    <daily-story :stories="content.stories" :title="''"></daily-story>
  </div>
</template>

<script>
  import Sidebar from "./Sidebar";
  import DailyStory from "./DailyStory";
  import { setEditors, readyStateChange } from "../vuex/actions";

  export default {
    data() {
      return {
        content: {},
        id: 0,
      }
    },
    vuex: {
      actions: {
        setEditors,
        readyStateChange,
      }
    },
    components: {
      Sidebar,
      DailyStory,
    },
    methods: {
      imageUrlFix() {
        this.content.stories.forEach(function (entry) {
          if (entry.images) {
            entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
          }
        });
        if (this.content.image) {
          this.content.image = this.content.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        };
        if (this.content.editors) {
          this.content.editors.forEach(function (entry) {
            entry.avatar = entry.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        });
        }
      },
      clearStyle() {
        var style = document.getElementById('storyCss');
        if (style) {
          style.remove();
        }
      },
      loadOld() {
        if (document.body.scrollHeight - window.scrollY < 1500) {
          window.removeEventListener("scroll", this.loadOld)
          const source = "/api/4/theme/" + this.id + "/before/" + this.content.stories[this.content.stories.length - 1].id;
          this.$http.get(source).then(function (response) {
            response.body.stories.forEach(function (entry) {
              if (entry.images) {
                entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
              }
              this.content.stories.push(entry);
            }.bind(this));
            window.addEventListener("scroll", this.loadOld);
          })
        }
      },
      initPage() {
        this.readyStateChange();
      this.clearStyle();
      if (this.id === this.$route.params.themeId) {
        return;
      }
      this.id = this.$route.params.themeId;
      const source = "/api/4/theme/" + this.id;
      this.$http.get(source).then(function (response) {
        this.content = response.body;
        this.imageUrlFix();
        if (this.content.editors) {
          this.setEditors(this.content.editors);
          const newdata = JSON.stringify(this.content.editors);
          sessionStorage.setItem("editors", newdata);
        }
      });
      window.addEventListener("scroll", this.loadOld);
      this.readyStateChange();
      }
    },
    watch: {
      '$route': 'initPage'
    },
    created() {
      this.initPage();
    },
  }
</script>

<style lang="scss" scoped>
  .theme-title-container {
    width: 100%;
    height: 13rem;
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
      font-size: 1.17em;
    }
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 11px;
      color: #b8b8b8;
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
    }
  }

  .theme-editors {
    width: 100%;
    height: 2rem;
    background-color: #f0f0f0;
    line-height: 3rem;
    padding-top: 0.7rem;
    color: #000;

     span {
        float: left;
        height: 100%;
        font-weight: bold;
        font-size: 0.8rem;
        margin-left: 0.5rem;
     }

     .theme-editors-avatar {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        border-radius: 1.3rem;
        margin-left: 0.5rem;
        padding-bottom: 0.2rem;

        img {

          height: 80%;
          width: 80%;
          vertical-align: center;
          object-fit: cover;
          border-radius: 1.3rem;
        }
      }
    }
</style>