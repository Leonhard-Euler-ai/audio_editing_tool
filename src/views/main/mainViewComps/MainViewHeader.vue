<template>
  <header>
    <el-steps :active="activeStepIndex" simple>
      <el-step title="上传视频" icon="el-icon-upload"></el-step>
      <el-step title="编辑视频" icon="el-icon-edit"></el-step>
      <el-step title="确认更改" icon="el-icon-success"></el-step>
    </el-steps>
  </header>
</template>

<script>
  export default {
    name: "MainViewHeader",
    props:{
      activeStepIndex:{
        type:Number,
        default(){
          return 0
        }
      }
    }
  }
</script>

<style scoped>
  header {
    width: 60%;
    margin: 20px 0 0 100px;
  }
</style>
