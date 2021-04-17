<template>
  <div>
    <video
      :src="videoSrc"
      ref="modifiedVideo"
      autoplay controls
      poster="~assets/img/video.jpg">
    </video>
    <el-alert
      class="tip"
      title="只显示已被编辑过的视频片段，如需修改请返回上一级"
      type="success"
      close-text="知道了">
    </el-alert>
    <ScrollBar :video-img-infos="videoImgInfos" :parent="viewName"/>
  </div>
</template>

<script>
  import ScrollBar from "../edit/ScrollBar";
  import {requestGetVideo} from "network/video";

  export default {
    name: "Submit",
    components: {
      ScrollBar
    },
    props: {
      modifiedData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      modifiedData(newValue) {
        this.modifiedVideoData = newValue
        let start = this.modifiedVideoData.startTime
        let end = this.modifiedVideoData.endTime
        this.videoImgInfos = []
        for (let i = 0; i < this.modifiedVideoData.num; i++) {
          console.log("submit第" + i + "次循环")
          console.log(start[i])
          console.log(start[i].type)
          // if(start[i]===null){
          //   console.log("跳过了本次")
          //   continue//当前片段没有更改，跳过循环
          // }
          console.log("本次！！")
          // this.realVideoUrl.push(this.modifiedVideoData.videoPartUrl[i])
          // console.log(this.modifiedVideoData.videoPartUrl[i])
          this.videoImgInfos.push(new Object(
            {
              startTime: start[i],
              endTime: end[i],
              imgSrc: this.modifiedVideoData.imgSrcs[i]
            }))
        }
      }
    },
    data() {
      return {
        viewName: 'SubmitView',
        modifiedVideoData: this.modifiedData,
        videoImgInfos: [],
        videoSrc: '',
        // realVideoUrl:[]//因为修改后的下标不是顺序排列，要新建一个数组，保存正确顺序的视频url
      }
    },
    mounted() {
      // let _this=this
      this.$Bus.$on("imgClick", object => {
        if (object.parent !== "SubmitView") {
          return
        }
        // console.log("获取真正的地址"+_this.realVideoUrl[object.index])
        let modifiedVideoPattern = this.modifiedVideoData.videoPartUrl[object.index]//将假的下标，通过提前保存的数组，获取其视频片的url
        console.log(modifiedVideoPattern)
        requestGetVideo(modifiedVideoPattern).then(axiosRes => {
          let videoBlob = axiosRes.data
          this.videoSrc = URL.createObjectURL(videoBlob);
          this.$refs.modifiedVideo.load();
        })
      })
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
