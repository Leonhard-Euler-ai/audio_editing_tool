<template>
  <div>
    <MainViewHeader :active-step-index="activeStepIndex"/>
    <Upload v-show="1===currentStepIndex" @finishUpload="finishUpload" @removeOnlyFile="disableNextStep"/>
    <Edit v-show="2===currentStepIndex" :videoInfos="videoInfos"/>
    <Submit v-show="3===currentStepIndex" :modifiedData="submitViewData"/>
    <!--    <input type="text" v-model="testUrl"-->
    <!--           placeholder="示例：输入/test,按Enter发送请求"-->
    <!--           @keypress.enter="testClick"/>-->
    <MainViewFooter :is-disabled="nextStepIsDisabled"
                    :pre-step-title="preStepTitle"
                    :next-step-title="nextStepTitle"
                    @preStepClick="preStepClick"
                    @nextStepClick="nextStepClick"
                    @finishEdit="finishEdit"
                    @finishSubmit="finishSubmit"/>
  </div>
</template>

<script>
  import MainViewHeader from "./mainViewComps/MainViewHeader";
  import MainViewFooter from "./mainViewComps/MainViewFooter";

  import Upload from "./mainViewComps/mainViewCenter/upload/Upload";
  import Edit from "./mainViewComps/mainViewCenter/edit/Edit";
  import Submit from "./mainViewComps/mainViewCenter/submit/Submit";

  import {requestTest} from "network/test";
  import {requestEdit} from "network/edit";
  import {requestImg} from "network/img";

  export default {
    name: "Main",
    data() {
      return {
        nextStepIsDisabled: true,  //开始为true,不能点击
        stepTitles: ["退出登录", "上传视频", "编辑视频", "确认更改", "确认提交"],
        currentStepIndex: 1,
        preStepTitle: "退出登录",
        nextStepTitle: "编辑视频",
        activeStepIndex: 0,
        testUrl: "/test",

        videoInfos: {},
        submitViewData: {}

      }
    },
    components: {
      MainViewHeader,
      MainViewFooter,
      Upload,
      Edit,
      Submit
    },
    mounted() {
      this.$Bus.$on("beforeSubmitViewCreated", originalData => {
        this.submitViewData = originalData
      })
    },
    methods: {
      finishUpload() {
        this.nextStepIsDisabled = false;
        this.activeStepIndex = 1;
        //上传成功后从后端申请获得视频分片的信息
        requestEdit(this.$store.state.token).then(axiosRes => {
          if (axiosRes.data.code === 200) {
            let originalData = axiosRes.data.data;

            // 所有图片urls
            let imgURLs = originalData.inclusivePart.imageUrl
            console.log(imgURLs)

            //给后台返回数据对象增加imgBlob数组
            // Vue.set(originalInclusivePart,'imgBlobs',res)
            originalData.imgBlobs = []
            originalData.imgSrcs = []

            let promises = []
            //依次请求依次给blob数组增加元素
            for (let i = 0; i < imgURLs.length; i++) {
              promises.push(requestImg(imgURLs[i]).then(res => {
                originalData.imgBlobs[i] = res.data
                let url = URL.createObjectURL(res.data)
                originalData.imgSrcs[i] = url
              }))
            }
            Promise.all(promises).then(res => {
              this.videoInfos = originalData;
            })
          }
        })
      },
      disableNextStep() {
        this.nextStepIsDisabled = true;
      },
      finishEdit() {
        this.nextStepIsDisabled = false;
        this.activeStepIndex = 2;
      },
      finishSubmit() {
        this.nextStepIsDisabled = true;
        this.activeStepIndex = 3;
      },

      preStepClick() {
        // if(this.currentStepIndex===1)
        //   return
        this.currentStepIndex--;
        this.preStepTitle = this.stepTitles[this.currentStepIndex - 1];
        this.nextStepTitle = this.stepTitles[this.currentStepIndex + 1]
      },
      nextStepClick() {
        // if(this.currentStepIndex===3)
        //   return
        this.currentStepIndex++;
        this.preStepTitle = this.stepTitles[this.currentStepIndex - 1];
        this.nextStepTitle = this.stepTitles[this.currentStepIndex + 1]
      },

      testClick() {
        requestTest(this.testUrl).then(res => {
          console.log("测试响应结果:" + res);
          if (res.data.code === 404) {
            this.$router.push("/notfound")
          }
        }).catch(err => {
          console.log("测试异常： " + err);
        })
      }
    }
  }
</script>

<style scoped>
  input {
    position: absolute;
    width: 30%;
    top: 80%;
    left: 30%;
    z-index: 2;
    margin: 20px auto;
    border: solid 1px #000;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
</style>
