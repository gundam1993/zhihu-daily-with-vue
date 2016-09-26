import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  date: "",
  stories: [],
  topStories: [],
  nowWatching: "",
};

const mutations = {
  INIT_STORE(state, data) {
    state.date = data.body.date;
    state.stories = data.body.stories;
    state.topStories = data.body.top_stories;
  },
  SET_NOWWATCHING(state, data) {
    state.nowWatching = data;
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
