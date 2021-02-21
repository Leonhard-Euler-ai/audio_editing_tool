<template>
  <div class="LoginViewLeft">
    <div>
      <a href="https://www.ommdata.com/" title="返回首页" class="TopButton-left">返回首页</a>
      <a href="https://www.ommdata.com/front/login" title="学员登录" class="TopButton-right">学员登录</a>
    </div>
    <div class="LoginFromBox">
      <a href="#" title="手机号登录" class="fromTitle">手机号登录</a>
      <LoginForm/>
      <div class="fromBottom">
        <a href="#" title="去注册"
           class="f-fM tac fSize16 login-options-2019-zc">
          <span class="register-line register-line-l"></span>
          <span class="register-line register-line-r"></span>
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
  .LoginViewLeft {
    padding: 20px 40px 20px;
  }

  /*以下三个样式是全局都用得到的，但是我不知道写哪，暂时写在这里了*/
  a {
    color: #ff662f;
    text-decoration: none
  }

  a:active {
    outline: 0;
    blr: expression(this.onFocus=this.blur());
  }

  a:hover {
    text-decoration: underline;
  }

  .TopButton-left {
    font-size: 14px;

  }

  .TopButton-right {
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

  .TopButton-right:hover {
    text-decoration: none;
    opacity: 0.85;
  }

  .LoginFromBox {
    width: 75%;
    margin: 45px auto 0;
  }

  .fromTitle {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .fromBottom {
    text-align: center;
  }

  .fromBottom a {
    text-align: center;
    font-size: 16px;
    display: inline-block;
    position: relative;
    line-height: 30px;
  }

  .register-line {
    background: #ff662f;
    position: absolute;
    width: 40px;
    height: 1px;
    top: 15px;
  }

  .register-line-l {
    left: -50px;
  }

  .register-line-r {
    right: -50px;
  }
</style>
