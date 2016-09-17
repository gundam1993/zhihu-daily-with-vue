import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  startImage: {},
};

const mutations = {
  INIT_STORE(state, data) {
    state.startImage = data.startImage;
  }
};

export default new Vuex.Store({
  state,
  mutations,
});
