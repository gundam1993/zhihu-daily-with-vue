import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MainPage from "./components/MainPage.vue";
import StoryDisplay from "./components/StoryDisplay.vue"

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/index': {
    component: MainPage,
  },
  "/story/:storyId": {
    component: StoryDisplay
  }
});

router.redirect({
  '*': 'index',
});

router.start(App, '#app');
