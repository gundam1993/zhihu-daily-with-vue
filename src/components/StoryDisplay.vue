<template>
  <div id="story-display">
    <div v-show="readyState">
      <div>
        <div class="title-container" v-if="content.image">
          <img :src="content.image" alt="">
          <h3>{{ content.title }}</h3>
          <span>{{ content.image_source }}</span>
        </div>
        <div class="story-recommenders" v-if="content.recommenders">
          <span>推荐者</span>
          <div class="story-recommenders-avatar"
               v-for="recommender in content.recommenders">
            <img :src="recommender.avatar">       
          </div>
        </div>
        {{{ content.body }}}
      </div>
      <div class="story-section" v-if="content.section" v-link="{name: 'section', params: { sectionId: content.section.id }}">
        <img :src="content.section.thumbnail">
        本文来自：{{content.section.name}}·合集
        <i class="iconfont icon-iconfontjiantou1"></i>
      </div>
    </div>
    <page-controller :content="extra"></page-controller>
  </div>
</template>

<script>
  import PageController from "./PageController";
  import { setNowWatching, readyStateChange } from "../vuex/actions"

  export default {
    components: {
      PageController,
    },
    data() {
      return {
        content: {},
        extra: {},
        readyState: false,
      }
    },
    vuex: {
      actions: {
        setNowWatching,
        readyStateChange,
      }
    },
    methods: {
      loadCss(src) {
        var link = document.createElement( "link" ); 
        link.type = "text/css"; 
        link.rel = "stylesheet"; 
        link.href = src; 
        link.id = "storyCss";
        document.getElementsByTagName( "head" )[0].appendChild( link ); 
      },
      fixImageUrl(content) {
        content.body = content.body.replace(/src="http\w{0,1}:\/\/p/g, 'src="https://images.weserv.nl/?url=p');
       if (content.image) {
          content.image = content.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
        if (content.section) {
          content.section.thumbnail = content.section.thumbnail.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        };
        if (content.recommenders) {
          content.recommenders.forEach(function (entry) {
            entry.avatar = entry.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
          });
        }
      },
      setWatchId() {
        var id = this.$route.path.match(/\d+/);
        this.setNowWatching(id[0]);
      }
    },
    
    ready() {
      this.readyStateChange();
      const source = '/api/4/news/' + this.$route.params.storyId,
            extraSource = '/api/4/story-extra/' + this.$route.params.storyId;
      this.$http.get(source).then(function (response) {
        this.content = response.body;
        this.loadCss(this.content.css[0]);
        this.fixImageUrl(this.content);
        this.readyState = true;
        this.$http.get(extraSource).then(function (response) {
          this.extra = response.body;
        });
      })
      this.setWatchId();
      this.readyStateChange();
    },
  }
</script>

<style type="text/css">
  .img-place-holder {
    display: none;
  }
</style>

<style lang="scss" scoped>
  .story-display {
    background-color: #eee;
  }

  .title-container {
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
  
  .story-recommenders {
    width: 100%;
    height: 3rem;
    background-color: #f0f0f0;
    line-height: 3rem;

     span {
        float: left;
        height: 100%;
        font-weight: bold;
        font-size: 0.8rem;
        margin-left: 0.5rem;
     }

     .story-recommenders-avatar {
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

  .story-section {
    width: 90%;
    height: 3rem;
    background-color: #f0f0f0;
    margin: 0 auto 1rem auto;
    font-size: 0.7rem;
    line-height: 3rem;
    position: relative;

    img {
      height: 100%;
      margin-right: 0.5rem;
      vertical-align: top;
    }

    .icon-iconfontjiantou1 {
      font-size: 1rem;
      position: absolute;
      right: 0.5rem;
    }
  }
  .title-container-without-pic {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;

    h3 {
      font-size: 1.17em;
      color: #000;
    }
  }
</style>