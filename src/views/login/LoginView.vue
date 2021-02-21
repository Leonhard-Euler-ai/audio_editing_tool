<template>
  <div class="login">
    <div class="login_left_wrapper">
      <img src="~assets/img/login/login_bg.jpg" alt="">
    </div>
    <div class="login_right_wrapper">
      <div>表单</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "LoginView",
  computed:{
    ...mapGetters(['loginStatus'])
  },
  methods:{
    // 登录按钮点击事件
    // commitLogin() {
    //   向服务器发送登录请求
    //   requestLogin(username, password).then(res => {
    //     if (success) {
    //       //改变登录状态
    //       //this.$store.dispatch('loginSucceed')
    //     } else {
    //       this.$message.error('用户名或密码错误')
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.login_left_wrapper{
  height: 624px;
  width: 56%;
}
</style>
