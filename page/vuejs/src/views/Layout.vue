<template>
  <div class="page-container" id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">System</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full" id="nav">
        <div style="width:100%; padding: 10px 0 11px 10px; border-bottom: 1px solid #e0e0e0;">
          <!-- <img alt="Vue logo" src="../assets/logo-c9.png" width="42"> -->
          <span class="md-title" style="margin-left: 10px; vertical-align: middle;">MatchOrder</span>
        </div>
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>
        <md-list>
          <!-- <md-list-item>
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">
              <router-link to="/">แดชบอร์ด</router-link>
            </span>
          </md-list-item> -->
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">
              <router-link to="/product">สินค้า</router-link>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">
              <router-link to="/supplier">ซัพพลายเออร์</router-link>
            </span>
          </md-list-item>
          <!-- <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">
              <router-link to="/user">ลูกต้า</router-link>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">
              <router-link to="/user">ซัพพลายเออร์</router-link>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">
              <router-link to="/user">ผู้ใช้งาน</router-link>
            </span>
          </md-list-item> -->
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'layout' 
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