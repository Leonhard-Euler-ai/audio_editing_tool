<template>
  <div>
    <div class="crumbs">
      <el-steps :active="2" simple>
        <el-step title="上传视频" icon="el-icon-upload"></el-step>
        <el-step title="编辑视频" icon="el-icon-edit"></el-step>
        <el-step title="确认更改" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <div class="player">这里是视频播放窗口</div>
    <EditSurvey/>
  </div>
</template>

<script>
  import EditSurvey from "./editViewComps/EditSurvey";

  export default {
    name: "EditView",
    components: {
      EditSurvey
    }
  }
</script>

<style scoped>
  .crumbs {
    width: 60%;
    margin: 20px 0 0 100px;
  }

  .player {
    display: inline-block;
    background-color: pink;
    margin: 10px;
    height: 50%;
    width: 40%;
  }

</style>
