<template>
  <div class="editSurvey">
    <span>视频段起点</span>
    <span>？？？？</span>
    <span>视频段终点</span>
    <span>？？？？</span>
    <EditTools/>
  </div>
</template>

<script>
  import EditTools from "./EditTools";

  export default {
    name: "EditSurvey",
    components: {
      EditTools
    }
  }
</script>

<style scoped>
  .editSurvey {
    display: inline-block;
    height: 50%;
    width: 40%;
  }
</style>
