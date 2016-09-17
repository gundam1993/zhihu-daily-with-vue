import Vue from 'vue';

function makeAction(type) {
  return({ dispatch }, ...args) => dispatch(type, ...args);
}

export const initStore = makeAction('INIT_STORE');
