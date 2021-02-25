<template>
  <el-tooltip effect="light" placement="top">
    <template #content>
      起始时间点：<br/>结束时间点：
    </template>
    <p></p>
  </el-tooltip>
</template>

<script>
  export default {
    name: "ScrollBarTips"
  }
</script>

<style scoped>
  p {
    float: left;
    width: 100%;
    height: 100%;
    background: url(../../../../../assets/img/login/login_mobile.png) no-repeat center;
  }
</style>
