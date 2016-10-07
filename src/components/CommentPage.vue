<template>
  <div id="comments-page">
    <div class="comments-block">
      <div class="no-long-comment" v-if="!display.length">
          <div>
            <i class="iconfont icon-weekend" id="icon-weekend"></i>
            深度评论虚位以待
          </div>
        </div>
      <div class="comment-content-block" v-for="comment in display" transition="comment-change">
        
        <div class="comment-author-block">
          <div class="comment-author-avatar">
            <img :src="comment.avatar" >
          </div>
          <div class="comment-author">{{ comment.author }}</div>
          <div class="comment-like">
            <i class="iconfont icon-like"></i>
            <span>{{ comment.likes }}</span>
          </div>
        </div>
        <div class="comment-content">
            {{ comment.content }}
            <p v-if="comment.reply_to">//
            <span>
            {{ comment.reply_to.author }}
            </span>
            :
            {{ comment.reply_to.content }}</p>
            
        </div>
        <div class="comment-time">
          {{{ comment.time }}}
        </div>
      </div>
    </div>
    <div id="comment-controller"
         :class="{'comment-controller-hide': ControllerHide}"
         v-el:comment-controller>
      <div class="comment-length">
        <span v-if="display === longComments">{{ longComments.length }}条长评</span>
        <span v-if="display === shortComments">{{ shortComments.length }}条短评</span>
      </div>
      <div class="commit-toggle-btn"
           v-if="display === longComments"
           @click="toggleComment()">看短评</div>
      <div class="commit-toggle-btn"
           v-if="display === shortComments"
           @click="toggleComment()">看长评</div>
    </div>
  </div>
</template>

<script>
  import { getNowWatching } from "../vuex/getters";
  import { setNowWatching, readyStateChange } from "../vuex/actions"

  export default {
    data() {
      return {
        display: [],
        longComments: [],
        shortComments: [],
        ControllerHide: false,
      }
    },
    vuex: {
      getters: {
        getNowWatching,
      },
      actions: {
        setNowWatching,
        readyStateChange,
      }
    },
    methods: {
      clearStyle() {
        var style = document.getElementById('storyCss');
        if (style) {
          style.remove();
        }
      },
      setWatchId() {
        var id = this.$route.params.storyId;
        this.setNowWatching(id);
      },
      fixImageUrl(comments) {
        comments.forEach(function (entry) {
          entry.avatar = entry.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        });
      },
      fixTime(comments) {
        comments.forEach(function (entry) {
          var date = new Date(parseInt(entry.time) * 1000);
          entry.time = (date.getMonth() + 1) + "-" + (date.getDate()) +" " + (date.getHours()) + ":" + (date.getMinutes());
        })
      },
      toggleComment() {
        this.display === this.longComments ? this.display = this.shortComments : this.display = this.longComments;
      },
      toggleController() {
        if (window.scrollY >= this.scrollY && this.$els.commentController.className === "") {
          this.ControllerHide = true;
        }else if (window.scrollY < this.scrollY && this.$els.commentController.className === "comment-controller-hide") {
          this.ControllerHide = false;
        };
        this.scrollY = window.scrollY;
      }
    },
    ready() {
      this.readyStateChange();
      this.clearStyle();
      this.setWatchId();
      const longCommentSource = "/api/4/story/" + this.getNowWatching + "/long-comments",
            shortCommentSource = "/api/4/story/" + this.getNowWatching + "/short-comments";
      this.$http.get(longCommentSource).then(function (response) {
        this.fixImageUrl(response.body.comments);
        this.fixTime(response.body.comments);
        this.longComments = response.body.comments;
        this.display = this.longComments;
      });
      this.$http.get(shortCommentSource).then(function (response) {
        this.fixImageUrl(response.body.comments);
        this.fixTime(response.body.comments);
        this.shortComments = response.body.comments;
      });
      window.onscroll = this.toggleController.bind(this);
      this.readyStateChange();
    },
    beforeDestroy() {
      window.onscroll = "";
    },
  }
</script>

<style lang="scss" scoped>
  #comments-page {
    width: 100%;
    height: 100%;
    background-color: #eee;
    padding: 0.5rem 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, Sans-serif;
  }

  .comments-block{
    width: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  }

  .comment-content-block {
    width: 100%;
    background-color: #FFF;
    margin: 0.5rem 0;
    box-sizing: border-box;
    position: relative;
    padding: 0 0.5rem;
    
    .comment-author-block {
      height: 3rem;
      width: 100%;
      border-bottom: 1px solid #333;
      position: relative;

      .comment-author-avatar {
        height: 2rem;
        width: 2rem;
        border-radius: 1rem;
        margin: 0.5rem 0.5rem;
        position: absolute;
        top: 0;
        left: 0;

        img {
          height: 100%;
          width: 100%;
          vertical-align: bottom;
          object-fit: cover;
          border-radius: 1rem;
        }
      }

      .comment-author {
        height: 3rem;
        line-height: 3rem;
        font-size: 0.8rem;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 3.5rem;
      }

      .comment-like {
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        text-align: left;
        font-size: 0.7rem;
        color: #666;
        position: absolute;
        top: 0;
        right: 0.5rem;
      }
    }  
  }

  .comment-content {
    font-size: 0.8rem;
    font-weight: light;
    padding: 0.2rem 0.8rem;
    text-align: left;
    span {
      color: #0089A7;
    }
  }

  .comment-time {
    text-align: right;
    font-size: 0.7rem;
    color: #999; 
    margin-bottom: 0.5rem;
  }

  .no-long-comment {
    height: 100%;
    color: #999;
    margin: calc(50% - 4rem);

    .iconfont {
      display: block;
      font-size: 6rem;
      text-align: center;
    }
  }

  #comment-controller {
    width: 100%;
    height: 2.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFF;
    border-top: 1px solid #ccc;
    transition: all 0.5s ease;

    .comment-length {
      font-size: 1rem;
      font-weight: lighter;
      height: 2.5rem;
      line-height: 2.5rem;
      margin-left: 1.5rem;
      user-select: none;
    }

    .commit-toggle-btn {
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 0.5rem;
      background-color: #D75455;
      color: #FFF;
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }

  .comment-controller-hide {
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.5s ease;
  }

  .comment-change-transition {
    transition: all .6s ease-in-out;
  }
  
  .comment-change-enter {
    opacity: 0;
  }
  .comment-change-leave {
    opacity: 0;
  }
</style>