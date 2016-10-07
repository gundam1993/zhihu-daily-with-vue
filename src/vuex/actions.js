import Vue from 'vue';

function makeAction(type) {
  return({ dispatch }, ...args) => dispatch(type, ...args);
}

export const initStore = makeAction('INIT_STORE');

export const setNowWatching = makeAction('SET_NOWWATCHING');

export const setLoadingStr = makeAction('SET_LOADING_STR');

export const addOldStories = makeAction('ADD_OLDSTORIES');

export const setScrollHeight = makeAction('SET_SCROLL_HEIGHT');

export const setEditors = makeAction('SET_EDITORS');

export const readyStateChange = makeAction('READY_STATE_CHANGE');
