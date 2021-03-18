<template>
  <div>
    <MainViewHeader :active-step-index="activeStepIndex"/>
    <Upload v-show="1===currentStepIndex" @finishUpload="finishUpload" @removeOnlyFile="disableNextStep"/>
    <Edit v-show="2===currentStepIndex"/>
    <Submit v-show="3===currentStepIndex"/>
    <input type="text"  v-model="testUrl"
           placeholder="示例：输入/test,按Enter发送请求"
           @keypress.enter="testClick" />
    <MainViewFooter :is-disabled="nextStepIsDisabled"
                    :pre-step-title="preStepTitle"
                    :next-step-title="nextStepTitle"
                    @preStepClick="preStepClick"
                    @nextStepClick="nextStepClick"/>
  </div>
</template>

<script>
import MainViewHeader from "./mainViewComps/MainViewHeader";
import MainViewFooter from "./mainViewComps/MainViewFooter";

import Upload from "./mainViewComps/mainViewCenter/upload/Upload";
import Edit from "./mainViewComps/mainViewCenter/edit/Edit";
import Submit from "./mainViewComps/mainViewCenter/submit/Submit";

import {requestTest} from "network/test";

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
      testUrl:null
    }
  },
  components: {
    MainViewHeader,
    MainViewFooter,
    Upload,
    Edit,
    Submit
  },
  methods: {
    finishUpload() {
      this.nextStepIsDisabled = false;
      this.activeStepIndex = 1;
    },
    disableNextStep() {
      this.nextStepIsDisabled = true;
    },
    // finishEdit(){
    //   this.nextStepIsDisabled=false;
    //   this.activeStepIndex=2;
    // },
    // finishSubmit(){
    //   this.nextStepIsDisabled=false;
    //   this.activeStepIndex=3;
    // },

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

    testClick(){
      requestTest(this.testUrl).then(res=>{
        console.log("测试响应结果:" +res);
        if (res.data.code === 404) {
          this.$router.push("/notfound")
        }
      }).catch(err=>{
        console.log("测试异常： "+err);
      })
    }
  }
}
</script>

<style scoped>

</style>
