<template>
  <div>
    <video preload="metadata" controls autoplay
           ref="video"
           poster="~assets/img/video.jpg"
           :src="videoUrl">
    </video>
    <!--    <button @click="testButton">test</button>-->
    <EditSurvey :contents="contents" :startTimes="startTimes" :endTimes="endTimes"/>
    <ScrollBar :video-img-infos="videoImgInfos" :parent="viewName"/>
  </div>
</template>

<script>
  import EditSurvey from "./EditSurvey";
  import ScrollBar from "./ScrollBar";

  import {requestGetVideo} from "network/video";

  export default {
    name: "Edit",
    components: {
      EditSurvey,
      ScrollBar
    },
    props: {
      videoInfos: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      videoInfos(newValue) {
        this.videoParts = newValue
        // console.log("新的videoParts为：" + this.videoParts)
        // for(let i=0;i<this.videoParts.partNum;i++){
        //   console.log("当前是第"+i+"个循环下面打印图片src地址")
        //   console.log(this.videoParts.imgSrcs[i])
        //
        // }
        // console.log(this.videoParts.partNum)
        let videoPart = this.videoParts.inclusivePart
        // console.log("videoPart:" + videoPart)
        // console.log(videoPart.partNum)
        // console.log(videoPart.startTime)
        // console.log(videoPart.endTime)

        this.startTimes = videoPart.startTime
        this.endTimes = videoPart.endTime
        this.contents = videoPart.content
        for (let i = 0; i < videoPart.partNum; i++) {
          this.videoImgInfos.push(new Object(
            {
              startTime: videoPart.startTime[i],
              endTime: videoPart.endTime[i],
              imgSrc: this.videoParts.imgSrcs[i]
            }))

        }
        // for(let i=0;i<this.videoParts.partNum;i++){
        //   console.log("当前是第"+i+"个循环下面打印图片src地址")
        //   console.log(this.videoImgInfos.imgSrc[i])
        //
        // }
        // console.log("服务器传完封装的" + this.videoImgInfos)
      }
    },
    mounted() {
      this.$Bus.$on("imgClick", object => {
        if (object.parent !== "EditView") {
          return
        }
        let Url = this.videoParts.inclusivePart.videoPartUrl[object.index]
        requestGetVideo(Url).then(axiosRes => {
          let videoBlob = axiosRes.data
          this.videoUrl = URL.createObjectURL(videoBlob);
          console.log(this.videoUrl)
          this.$refs.video.load();
        })
      })
    },
    data() {
      return {
        viewName: 'EditView',
        videoUrl: "#",
        //原生所有视频信息
        videoParts: this.videoInfos,
        // 自定义的视频图片信息
        videoImgInfos: [],
        contents: [],
        startTimes: [],
        endTimes: []
      }
    },
    methods: {
      testButton() {


        // let _this=this
        // //创建XMLHttpRequest对象
        // var xhr = new XMLHttpRequest();
        // //配置请求方式、请求地址以及是否同步
        // xhr.open('POST', 'http://localhost:8182/test', true);
        // //设置请求结果类型为blob
        // xhr.responseType = 'blob';
        // //请求成功回调函数
        // xhr.onload = function (e) {
        //   if (this.status == 200) {//请求成功
        //     //获取blob对象
        //     let blob = this.response;
        //     //获取blob对象地址，并把值赋给容器
        //     console.log(blob)
        //     // _this.videoUrl=URL.createObjectURL(blob);
        //     // console.log(_this.videoUrl)
        //     // _this.$refs.video.load();
        //     // _this.$refs.video.play();
        //   }
        // };
        // xhr.send();
      }
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
