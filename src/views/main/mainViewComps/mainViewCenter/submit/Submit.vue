<template>
  <div>
    <video src="#" controls poster="../../../../../assets/img/video.jpg"></video>
    <el-alert
      class="tip"
      title="只显示已被编辑过的视频片段，如需修改请返回上一级"
      type="success"
      close-text="知道了">
    </el-alert>
    <ScrollBar/>
  </div>
</template>

<script>
  import ScrollBar from "../edit/ScrollBar";

  export default {
    name: "Submit",
    components: {
      ScrollBar
    }
  }
</script>

<style scoped>
  video {
    display: block;
    margin: 20px auto;
    width: 560px;
    height: 315px;
  }

  .tip {
    position: fixed;
    bottom: 27%;
    width: 40%;
    margin-left: 30%;
  }
</style>
