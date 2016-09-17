import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  content: {},
  loadState: false,
};

const mutations = {
  INIT_STORE(state, data) {
    state.content = data.body;
    state.loadState = true;
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
