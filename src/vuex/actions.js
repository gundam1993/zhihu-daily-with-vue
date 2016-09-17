import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

function makeAction(type) {
  return({ dispatch }, ...args) => dispatch(type, ...args);
}

var initData = {
  startImage: {},
};

Vue.http.get("/api/4/start-image/1080*1776").then(function (response) {
  initData.startImage = response.body;
},function (response) {
  console.log(response);
});


export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};
