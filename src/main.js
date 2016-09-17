import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import WelcomePage from "./components/WelcomePage";

Vue.use(VueRouter);

const router = new VueRouter();

router.map({

});

router.redirect({
  '*': '',
});

router.start(App, '#app');
