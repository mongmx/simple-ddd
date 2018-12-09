<template>
  <div>
    <md-button to="/dashboard" class="md-raised" :md-ripple="false">สั่งซื้อ</md-button>
    <md-button to="/dashboard" class="md-raised" :md-ripple="false">ดูราคา</md-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {};
</script>

<style lang="scss" scoped>
#content {
  height: 100vh;
  background-color: #000000;
  padding-top: 100px;
}

.md-layout {
  width: 400px;
  margin: auto;
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
