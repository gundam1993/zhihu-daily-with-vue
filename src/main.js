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

const router = new VueRouter({
  routes: [
    { path: '/index', component: MainPage },
    { path: '/story/:storyId', name: 'story', component: StoryDisplay },
    { path: '/comment/:commentId', name: 'comment', component: CommentPage },
    { path: '/theme/:themeId', name: 'theme', component: ThemePage },
    { path: '/section/:sectionId', name: 'section', component: SectionPage },
    { path: '/about', component: AboutPage },
    { path: '/editors', component: EditorsPage },
    { path: '*', redirect: '/index'}
  ]
});

export default new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
});
