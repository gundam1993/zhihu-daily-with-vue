<template>
  <div id="section-page">
    <sidebar :title="content.name"></sidebar>
    <daily-story :stories="content.stories" :title="''"></daily-story>
  </div>
</template>

<script>
  import Sidebar from "./Sidebar";
  import DailyStory from "./DailyStory";

  export default {
    data() {
      return {
        content: {},
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
          const source = "/api/4/section/" + this.$route.params.sectionId + "/before/" + this.content.timestamp;
          this.$http.get(source).then(function (response) {
            response.body.stories.forEach(function (entry) {
              if (entry.images) {
                entry.images[0] = entry.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
              }
              this.content.stories.push(entry);
              this.content.timestamp = response.body.timestamp;
            }.bind(this));
            window.addEventListener("scroll", this.loadOld);
          })
        }
      },
    },
    ready() {
      const source = "/api/3/section/" + this.$route.params.sectionId;
      this.$http.get(source).then(function (response) {
        this.content = response.body;
        this.imageUrlFix();
      });
      window.addEventListener("scroll", this.loadOld);
    }
  }
</script>