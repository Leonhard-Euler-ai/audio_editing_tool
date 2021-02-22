<template>
<div>
  <MainViewHeader/>
  <p>主页</p>
  <button @click="logout">取消登录</button>
</div>
</template>

<script>
  import MainViewHeader from "./mainViewComps/MainViewHeader";

  export default {
    name: "Main",
    components: {
      MainViewHeader
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
      }
    }
  }
</script>

<style scoped>

</style>
