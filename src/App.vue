<template>
  <div>
    <welcome-page transition="welcomePageTrans"></welcome-page>

  </div>
</template>

<script>
  import store from './vuex/store';
  import WelcomePage from './components/WelcomePage';
  import { getLoadState } from './vuex/getters'

  export default {
    store,
    vuex: {
      getters: {
        loadState:getLoadState,
      }
    },
    components: {
      WelcomePage,
    },
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  width: 100%;
  height: 100%;
  font-size:20px;
  box-sizing: border-box;
  overflow: hidden;
}

.welcomePageTrans-transition {
    transition: all 1.5s ease-in-out;
  }
  
  .welcomePageTrans-enter {
    opacity: 0;
  }
  .welcomePageTrans-leave {
    opacity: 0;
  }
</style>
