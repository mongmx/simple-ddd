<template>
  <div class="page-container" id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'layout2' 
};
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.md-app {
  border: 1px solid rgba(#000, .12);
}

.md-waterfall {
  height: 100vh;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-theme-default a:not(.md-button) {
  color: rgba(0,0,0,0.87);
}
</style>