<template>
  <div class="loginView">
    <div class="loginViewLeftPart">
      <img src="~assets/img/login/login_bg.jpg" alt="">
    </div>
    <div class="loginViewRightPart">
      <LoginViewMain/>
    </div>
  </div>
</template>

<script>
  import LoginViewMain from "./loginViewComps/LoginViewMain";

  export default {
    name: "LoginView",
    components: {
      LoginViewMain
    }
  }
</script>

<style scoped>
  .loginViewLeftPart {
    float: left;
    height: 100%;
    width: 56%;
  }

  .loginViewLeftPart img {
    width: 100%;
    height: 100%;
  }

  .loginViewRightPart {
    float: left;
    width: 44%;
    height: 100%;
  }

</style>
