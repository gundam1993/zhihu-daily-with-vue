import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MainPage from "./components/MainPage.vue";
import StoryDisplay from "./components/StoryDisplay.vue";
import CommentPage from "./components/CommentPage.vue";
import ThemePage from "./components/ThemePage.vue";
import AboutPage from "./components/AboutPage.vue";
import SectionPage from "./components/SectionPage.vue";
import EditorsPage from "./components/EditorsPage.vue"

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/index': {
    component: MainPage,
  },
  "/story/:storyId": {
    component: StoryDisplay,
  },
  "/comment/:storyId": {
    component: CommentPage,
  },
  "/theme/:themeId": {
    name: 'theme',
    component: ThemePage,
  },
  "/about": {
    component: AboutPage,
  },
  "/section/:sectionId": {
    name: 'section',
    component: SectionPage,
  },
  "/editors": {
    component: EditorsPage,
  }
});

router.redirect({
  '*': 'index',
});

router.start(App, '#app');
