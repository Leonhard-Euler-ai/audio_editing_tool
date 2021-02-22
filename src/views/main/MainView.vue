<template>
  <div>
    <MainViewHeader/>
    <div class="crumbs">
      <el-steps :active="1" simple>
        <el-step title="上传视频" icon="el-icon-upload"></el-step>
        <el-step title="编辑视频" icon="el-icon-edit"></el-step>
        <el-step title="确认更改" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传单个mp4文件，且不超过5GB</div>
      </el-upload>
    </div>
    <div class="loading">
      <el-progress class="el-progress" type="circle" :percentage="25"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="100" status="success"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="70" status="warning"></el-progress>
      <el-progress class="el-progress" type="circle" :percentage="50" status="exception"></el-progress>
    </div>
<!--    <MainViewFooter/>-->
  </div>
</template>

<script>
  import MainViewHeader from "./MainViewComps/MainViewHeader";
  // import MainViewFooter from "./MainViewComps/MainViewFooter";

  export default {
    name: "Main",
    components: {
      MainViewHeader,
      // MainViewFooter
    }
  }
</script>

<style scoped>
  .crumbs {
    width: 60%;
    margin: 20px 0 0 100px;
  }

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
