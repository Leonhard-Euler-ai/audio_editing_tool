<template>
  <div>
    <video src="#" controls poster="../../../../../assets/img/video.jpg"></video>
    <EditSurvey/>
    <ScrollBar/>
  </div>
</template>

<script>
  import EditSurvey from "./EditSurvey";
  import ScrollBar from "./ScrollBar";

  export default {
    name: "Edit",
    components: {
      EditSurvey,
      ScrollBar
    }
  }
</script>

<style scoped>
  video {
    display: inline-block;
    float: left;
    margin: 20px 20px 10px 100px;
    width: 560px;
    height: 315px;
  }
</style>
