<template>
  <div>
    <video preload="metadata" controls
           poster="~assets/img/video.jpg"
           :src="videoUrl">
    </video>
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
    },
    data(){
      return{
        videoUrl:'http://v2v.cc/~j/theora_testsuite/320x240.ogg'
      }
    },
    methods:{

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
