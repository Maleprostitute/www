<template>
  <div>
    <div class="h"></div>
    <div class="hm-header">
      <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.h {
  height: 60px;
}
.hm-header {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 999;
  text-align: center;
  display: flex;
  height: 60px;
  line-height: 60px;
  .back,
  .extra {
    width: 50px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
