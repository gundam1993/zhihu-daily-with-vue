<template>
  <div id="welcome-page">
    <img :src="img">
    <div class="welcome-page-title">
      <div>知乎日報</div>
    </div>
    <div class="welcome-page-copyright">
      <span>{{ auther }}</span>
    </div>
  </div>
</template>

<script>
  import { initStore } from '../vuex/actions'; 

  export default {
    vuex: {
      actions: {
        initStore
      }
    },
    data() {
      return {
        auther: '',
        img: '',
      }
    },
    methods: {
      getWelcomePage() {
        this.$http.get("/api/4/start-image/1242*2208").then(function (response) {
          this.img = response.body.img.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
          this.auther = response.body.text;
          console.log(this.date);
        },function (response) {
          console.log(response);
        });
      },
      getStory() {
        this.$http.get("/api/4/news/latest").then(function (response) {
          this.initStore(response);
        })
      }
    },
    ready() {
      this.getWelcomePage();
      this.getStory();
    },
  }
</script>

<style lang="scss" scoped>
  #welcome-page {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  img {
    width: 100%;
    vertical-align: bottom;
    object-fit: cover;
    object-position: center;
  }
  .welcome-page-title {
    background-color: #FFF;
    width: 4rem;
    height: 9.4rem;
    position: absolute;
    top: 20%;
    right: calc(50% - 2rem);

    div {
      width: 3rem;
      font-size: 2rem;
      font-family: 'TypeLand 康熙字典體';
      line-height: 2rem;
      margin: 0 auto;
      margin-top: 0.5rem;
      padding: 0.2rem 0;
      text-align: center;
      color: #000;
      border: 3px solid #AB3B3A;
    }
  }
  .welcome-page-copyright {
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    position: absolute;
    color: #eee;
    bottom: 0.4rem;
  }
</style>