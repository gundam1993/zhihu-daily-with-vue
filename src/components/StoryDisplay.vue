<template>
  <div id="story-dsiplay">
    <div v-show="readyState">
      <div v-if="content.type === 0">
      <div class="title-container">
        <img :src="content.image" alt="">
        <h3>{{ content.title }}</h3>
        <span>{{ content.image_source }}</span>
      </div>
        {{{ content.body }}}
      </div>
      <div class="story-section" v-if="content.section">
        <img :src="content.section.thumbnail">
        本文来自：{{content.section.name}}·合集
        <i class="iconfont icon-iconfontjiantou1"></i>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        content: {},
        readyState: false,
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
        content.image = content.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        if (content.section) {
          content.section.thumbnail = content.section.thumbnail.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      parseToDOM(str) {
        var div = document.createElement("div");
        if(typeof str == "string") {
          div.innerHTML = str;
          return div.childNodes;
        }
      },
    },
    ready() {
      var source = '/api/4/news/' + this.$route.params.storyId;
      this.$http.get(source).then(function (response) {
        this.content = response.body;
        this.content.image = this.content.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        this.loadCss(this.content.css[0]);
        this.fixImageUrl(this.content);
        this.readyState = true;
      })
    }
  }
</script>

<style type="text/css">
  .headline {
    display: none;
  }
</style>

<style lang="scss" scoped>
  .story-dsiplay {
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
</style>