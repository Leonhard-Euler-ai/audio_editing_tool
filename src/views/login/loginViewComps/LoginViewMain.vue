<template>
  <div class="loginViewMain">
    <div>
      <a >返回首页</a>
      <a class="administratorLoginButton">管理员登录</a>
    </div>
    <div class="loginFormBox">
      <a class="formTitle">手机号登录</a>
      <LoginForm/>
      <div class="formBottom">
        <a>
          <span class="registerLine registerLine-l"></span>
          <span class="registerLine registerLine-r"></span>
          还没账号？去注册
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from "./LoginForm";

  export default {
    name: "LoginViewLeft",
    components: {
      LoginForm
    }
  }
</script>

<style scoped>
  .loginViewMain {
    padding: 20px 40px 20px;
  }

  .administratorLoginButton {
    display: block;
    float: right;
    background-color: #ff662f;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
  }

  .administratorLoginButton:hover {
    text-decoration: none;
    opacity: 0.85;
  }

  .loginFormBox {
    width: 75%;
    margin: 45px auto 0;
  }

  .formTitle {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .formBottom {
    text-align: center;
  }

  .formBottom a {
    text-align: center;
    font-size: 16px;
    display: inline-block;
    position: relative;
    line-height: 30px;
  }

  .registerLine {
    background: #ff662f;
    position: absolute;
    width: 40px;
    height: 1px;
    top: 15px;
  }

  .registerLine-l {
    left: -50px;
  }

  .registerLine-r {
    right: -50px;
  }
</style>
