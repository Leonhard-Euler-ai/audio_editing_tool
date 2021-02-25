<template>
  <el-button-group class="footer">
    <el-button class="footerButton" type="danger" icon="el-icon-arrow-left" @click="logout">取消登录</el-button>
    <el-button class="footerButton" type="success" :disabled="isDisabled" @click="edit">编辑视频<i
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
      }
    },
    methods: {
      logout() {
        window.sessionStorage.removeItem('authorization')
        this.$store.dispatch('logout').then(res => {
          this.$message.info({
            message: res,
            offset: 200
          })
          this.$router.replace('/login')
        })
      },
      edit() {
        //在上传成功后解禁绿色按钮，点击即可转到编辑界面
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
