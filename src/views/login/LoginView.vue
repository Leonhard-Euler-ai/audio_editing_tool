<template>
  <div class="login">
    <div class="login_left_wrapper">
      <img src="~assets/img/login/login_bg.jpg" alt="">
    </div>
    <div class="login_right_wrapper">
      <LoginViewLeft/>
    </div>
  </div>
</template>

<script>

  import LoginViewLeft from "./LoginViewLeft";

  export default {
    name: "LoginView",
    components: {
      LoginViewLeft
    }
  }
</script>

<style scoped>
  .login_left_wrapper {
    float: left;
    height: 624px;
    width: 56%;
  }

  .login_left_wrapper img {
    width: 100%;
    height: 100%;
  }

  .login_right_wrapper {
    float: left;
    width: 44%;
    height: 100%;
  }

</style>
