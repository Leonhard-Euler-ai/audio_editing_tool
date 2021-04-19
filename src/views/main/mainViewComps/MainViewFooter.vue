<template>
  <el-button-group class="footer">
    <el-button class="footerButton" type="danger" icon="el-icon-arrow-left" @click="preStepClick">{{preStepTitle}}</el-button>
    <el-button class="footerButton" type="success" :disabled="isDisabled" @click="nextStepClick">{{nextStepTitle}}<i
      class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>

<script>
  import {requestGetVideo} from "network/video";
  export default {
    name: "MainViewFooter",
    props: {
      isDisabled: {
        type: Boolean,
        default() {
          return true
        }
      },
      preStepTitle:{
        type:String,
        default() {
          return ""
        }
      },
      nextStepTitle:{
        type:String,
        default() {
          return ""
        }
      }
    },

    methods: {
      logout() {
        //重新设置登录状态
        this.$store.dispatch('logout')
        //退出登录跳转到登录页面
        this.$router.replace('/login')
      },
      preStepClick(){
        if(this.preStepTitle==="退出登录"){
          this.$confirm('确认退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:"info"
          }).then(() => {
            this.logout()
          }).catch(()=>{})
          return
        }
        this.$emit("preStepClick")
      },
      nextStepClick() {
        if (this.nextStepTitle === "确认更改") {
          this.$emit("finishEdit")
          this.$Bus.$emit("finishEdit")
        }
        if (this.nextStepTitle === "效果预览") {
          this.$message.info('系统处理中，请不要退出此界面，该过程可能会持续几分钟');
          //开始发送请求,让后台合并,成功后直接跳转到最后的界面
          requestGetVideo(null).then(axiosRes => {
            let videoBlob = axiosRes.data
            let videoUrl = URL.createObjectURL(videoBlob);
            console.log(videoUrl)

            //将视频链接发给最后的界面
            // this.$refs.video.load();
            this.$Bus.$emit("mergeClick", videoUrl)
            this.$router.push('/play')
          })
        }
        // if (this.nextStepTitle === "确认提交") {
        //   this.$confirm('确认提交?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: "info"
        //   }).then(() => {
        //     this.$emit("finishSubmit")
        //     this.$message({
        //       type: 'success',
        //       message: '提交成功!'
        //     });
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消提交'
        //     });
        //   });
        //   return
        // }
        this.$emit("nextStepClick")
      }
    }
  }
</script>

<style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  Button {
    width: 50%;
  }
</style>
