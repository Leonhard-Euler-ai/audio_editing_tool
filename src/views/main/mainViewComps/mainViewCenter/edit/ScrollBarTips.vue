<template>
  <el-tooltip effect="light" placement="top">
    <template #content>
      起始时间点：{{videoImgInfo.startTime}}
      <br/>
      结束时间点：{{videoImgInfo.endTime}}
    </template>
    <img :src="url" alt="">
  </el-tooltip>
</template>

<script>
  export default {
    name: "ScrollBarTips",
    props: {
      videoImgInfo: {
        type: Object,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        // url:"D:/upload/videoResources/19/01.jpg"
        url: "#"
      }
    },
    methods: {}
  }
</script>

<style scoped>
  img {
    display: block;
    width: 100%;
    height: 100%;
    /*background: url("D:/upload/videoResources/19/00.jpg") no-repeat center;*/
    /*../../../../../assets/img/login/login_mobile.png*/
  }
</style>
