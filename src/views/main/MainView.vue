<template>
<div>
  <p>主页</p>
  <button @click="logout">取消登录</button>
</div>
</template>

<script>
export default {
  name: "Main",
  methods:{
    logout() {
      window.sessionStorage.removeItem('authorization')
      this.$store.dispatch('logout').then(res=>{
        this.$message.info({
          message:res,
          offset:200
        })
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>
