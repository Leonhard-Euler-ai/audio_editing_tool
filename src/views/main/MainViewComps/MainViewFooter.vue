<template>
  <el-button-group class="MainViewFooter">
    <el-button type="danger" icon="el-icon-arrow-left" @click="logout">取消登录</el-button>
    <el-button type="success" disabled="true">编辑视频<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>

<script>
  export default {
    name: "MainViewFooter",
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
      }
    }
  }
</script>

<style scoped>
  .MainViewFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  button {
    width: 50%;
  }
</style>
