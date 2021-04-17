<template>
  <el-button-group class="footer">
    <el-button class="footerButton" type="danger" icon="el-icon-arrow-left" @click="preStepClick">{{preStepTitle}}</el-button>
    <el-button class="footerButton" type="success" :disabled="isDisabled" @click="nextStepClick">{{nextStepTitle}}<i
      class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>

<script>
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
        if (this.nextStepTitle === "确认提交") {
          this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "info"
          }).then(() => {
            this.$emit("finishSubmit")
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            });
          });
          return
        }
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
