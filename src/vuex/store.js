import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  date: "",
  stories: [],
  topStories: [],
};

const mutations = {
  INIT_STORE(state, data) {
    state.date = data.body.date;
    state.stories = data.body.stories;
    state.topStories = data.body.top_stories;
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
