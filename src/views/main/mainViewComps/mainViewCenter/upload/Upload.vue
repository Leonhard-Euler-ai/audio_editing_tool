<template>
  <div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" @click="finishUpload">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传单个mp4文件，且不超过5GB</div>
      </el-upload>
    </div>
    <div class="loading">
      <el-progress class="el-progress" type="circle" :percentage="25"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="100" status="success"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="70" status="warning"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="50" status="exception"></el-progress>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Upload",
    methods:{
      finishUpload() {
        this.$emit("finishUpload")
      }
    }
  }
</script>

<style scoped>
  .upload {
    display: inline-block;
    width: 38%;
    margin: 80px 0 0 150px;
  }

  .loading {
    display: inline-block;
  }

  .el-progress {
    margin: 20px 10px;
  }
</style>
