import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  mainPageHeight: 0,
  readyState: false,
  loadedDate: "",
  loadingStr: "",
  todayStories: [],
  topStories: [],
  oldStories: [],
  nowWatching: "",
  editors: [],
};

const mutations = {
  INIT_STORE(state, data) {
    state.loadedDate = new Date();
    state.todayStories = data.body.stories;
    state.topStories = data.body.top_stories.reverse();
  },
  SET_SCROLL_HEIGHT(state, height) {
    state.mainPageHeight = height;
  },
  SET_NOWWATCHING(state, data) {
    state.nowWatching = data;
  },
  SET_LOADING_STR(state) {
    const loaded = new Date(state.loadedDate),
      loadingDay = new Date(loaded.getFullYear(),loaded.getMonth(),loaded.getDate()),
      loadingStrHead = "/api/4/news/before/";
    if (loadingDay.getMonth() > 8 && loadingDay.getDate() > 9) {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + (loadingDay.getMonth() + 1) + (loadingDay.getDate());
    }else if(loadingDay.getDate() > 9) {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + "0" + (loadingDay.getMonth() + 1) + (loadingDay.getDate());
    }else if(loadingDay.getMonth() > 8) {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + (loadingDay.getMonth() + 1) + "0" + (loadingDay.getDate());
    }else {
      state.loadingStr = loadingStrHead + loadingDay.getFullYear() + "0" + (loadingDay.getMonth() + 1) + "0" + (loadingDay.getDate());
    }
    state.loadedDate = new Date(loaded.getFullYear(),loaded.getMonth(),loaded.getDate() - 1);
  },
  ADD_OLDSTORIES(state, data) {
    state.oldStories.push(data);
  },
  SET_EDITORS(state, editors) {
    state.editors = editors;
  },
  READY_STATE_CHANGE(state) {
    state.readyState = !state.readyState;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
