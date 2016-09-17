<template>
  <div>
  <router-view transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  import store from './vuex/store';
  import { initStore } from './vuex/actions'; 

  export default {
    store,
    vuex: {
      actions: {
        initStore,
      }
    },
    ready() {
      this.initStore();
    }
  }
</script>

<style>
html {
  height: 100%;
}

</style>
