import Vue from 'vue';

function makeAction(type) {
  return({ dispatch }, ...args) => dispatch(type, ...args);
}

export const initStore = makeAction('INIT_STORE');

export const setNowWatching = makeAction('SET_NOWWATCHING');

export const setLoadingStr = makeAction('SET_LOADING_STR');

export const addOldStories = makeAction('ADD_OLDSTORIES');
