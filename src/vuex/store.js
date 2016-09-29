import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  scrollHeight: 0,
  loadedDate: "",
  loadingStr: "",
  todayStories: [],
  topStories: [],
  oldStories: [],
  nowWatching: "",
};

const mutations = {
  INIT_STORE(state, data) {
    state.loadedDate = new Date();
    state.todayStories = data.body.stories;
    state.topStories = data.body.top_stories.reverse();
  },
  SET_SCROLL_HEIGHT(state, height) {
    state.scrollHeight = height;
  },
  SET_NOWWATCHING(state, data) {
    state.nowWatching = data;
  },
  SET_LOADING_STR(state) {
    const loaded = new Date(state.loadedDate),
      loadingDay = new Date(loaded.getFullYear(),loaded.getMonth(),loaded.getDate() - 1),
      loadingStrHead = "/api/4/news/before/";
    if (loadingDay.getMonth() > 8 && loadingDay.getDate() > 8) {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + (loadingDay.getMonth() + 1) + (loadingDay.getDate() + 1);
    }else if(loadingDay.getDate() > 8) {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + "0" + (loadingDay.getMonth() + 1) + (loadingDay.getDate() + 1);
    }else {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + "0" + (loadingDay.getMonth() + 1) + "0" + (loadingDay.getDate() + 1);
    }
    state.loadedDate = loadingDay;
  },
  ADD_OLDSTORIES(state, data) {
    state.oldStories.push(data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
