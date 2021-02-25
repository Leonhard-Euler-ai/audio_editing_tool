<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="编辑文本替换" name="first">编辑文本替换</el-tab-pane>
    <el-tab-pane label="录制音频替换" name="second">录制音频替换</el-tab-pane>
    <el-tab-pane label="上传音频替换" name="third">上传音频替换</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "EditTools",
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>

</style>
