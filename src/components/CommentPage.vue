<template>
  <div id="comments-page">
    <div class="comments-block">
      <div class="comment-length">{{ longComments.length }}条长评</div>
      <div class="commit-toggle-btn">看短评</div>
      <div class="no-long-comment" v-if="!longComments.length">
          <div>
            <i class="iconfont icon-weekend" id="icon-weekend"></i>
            深度评论虚位以待
          </div>
        </div>
      <div class="comment-content-block" v-for="comment in longComments">
        
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
    
  </div>
</template>

<script>
  import { getNowWatching } from "../vuex/getters";
  import { setNowWatching } from "../vuex/actions"

  export default {
    data() {
      return {
        longComments: [],
        shortComments: [],
        showLongComments: true,
      }
    },
    vuex: {
      getters: {
        getNowWatching,
      },
      actions: {
        setNowWatching
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
        var id = this.$route.path.match(/\d+/);
        this.setNowWatching(id[0]);
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
      }
    },
    ready() {
      this.clearStyle();
      this.setWatchId();
      const longCommentSource = "/api/4/story/" + this.getNowWatching + "/long-comments",
            shortCommentSource = "/api/4/story/" + this.getNowWatching + "/short-comments";
      this.$http.get(longCommentSource).then(function (response) {
        this.fixImageUrl(response.body.comments);
        this.fixTime(response.body.comments);
        this.longComments = response.body.comments;
      });
      this.$http.get(shortCommentSource).then(function (response) {
        this.fixImageUrl(response.body.comments);
        this.fixTime(response.body.comments);
        this.shortComments = response.body.comments;
      });
    }
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

  .comment-length {
    font-size: 0.8rem;
    font-weight: lighter;
    display: block;
    width: 90%;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-left: 1.5rem;
    user-select: none;
  }
  .comments-block{
    width: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
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

  .commit-toggle-btn {
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0 0.5rem;
    background-color: #D75455;
    color: #FFF;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>