<template>
  <div>
    <p>登录状态：{{loginStatus}}</p>
    <button @click="login">登录</button>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "LoginForm",
    computed: {
      ...mapGetters(['loginStatus'])
    },
    methods: {
      // 登录按钮点击事件
      // commitLogin() {
      //   向服务器发送登录请求
      //   requestLogin(username, password).then(res => {
      //     ------------------
      //   })
      // }
      // 直接登录成功,'123'为测试用的sessionId
      login() {
        window.sessionStorage.setItem('authorization', '123')
        this.$store.dispatch('loginSucceed', '123').then(res => {
          this.$message.success({
            message: res,
            offset: 200
          })
        })
        this.$router.push('/main')
      }
    }
  }
</script>

<style scoped>

</style>
