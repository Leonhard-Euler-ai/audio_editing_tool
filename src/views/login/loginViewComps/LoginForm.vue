<template>
  <div style="margin-top: 30px;">
    <ol>
      <li id="phone">
        <p>手机号</p>
        <div class="inputBorder">
          <em class="inputIco iconFont"></em>
          <!--            <img src="https://www.ommdata.com/static/inxweb/img/2019-img/2019-login-mobile.png">-->
          <input type="text"
                 onkeyup='$("#errorMsg").text("");'
                 placeholder="请输入手机号"/>
        </div>
      </li>
      <li id="pwd">
        <p>密码</p>
        <div class="inputBorder">
          <em class="inputIco iconFont"></em>
          <!--            <img src="https://www.ommdata.com/static/inxweb/img/2019-img/2019-login-password.png">-->
          <input type="password"
                 onkeyup='$("#errorMsg").text("");'
                 class="pass-show" placeholder="请输入密码" value=""/>
          <!--          <em class="passwordVisibility iconFont"></em>-->
          <!--上面的是隐藏型小眼睛字体图标-->
          <em class="passwordVisibility iconFont"></em>
          <!--          这个是睁开眼睛的字体图标-->
          <!--<img src="https://www.ommdata.com/static/inxweb/img/2019-img/input-close.png">-->
          <!-- <img src="https://www.ommdata.com/static/inxweb/img/2019-img/input-look.png"-->
        </div>
      </li>
      <li>
        <p>验证码</p>
        <div class="clearFix">
          <div class="inputBorder" style="float: left">
            <em class="inputIco iconFont"></em>
            <!--              <img src="https://www.ommdata.com/static/inxweb/img/2019-img/2019-login-erification.png">-->
            <input type="text" maxlength="4" placeholder="请输入验证码" value=""/>
          </div>
          <img src="https://www.ommdata.com/ran/ajax/random" alt="验证码，点击图片更换"
               class="verificationCode" maxlength="4"
               onclick="this.src='https://www.ommdata.com/ran/ajax/random?random='+Math.random();"/>
        </div>
      </li>
      <li>
        <p>登录状态：{{loginStatus}}</p>
        <button @click="login" class="loginButton">登录</button>
      </li>
    </ol>
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
  p {
    font-size: 14px;
    margin-top: 15px;
    color: #333;
    margin-left: 5px;
  }

  .inputBorder {
    position: relative;
    margin-top: 5px;
    border: 1px solid #D6DBDF;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border: none;
    height: 38px;
    line-height: 38px;
    border-radius: 2px;
    background: #fff;
    padding: 0px 30px 0px 45px;
    display: block;
  }

  .inputIco {
    display: block;
    width: 38px;
    height: 38px;
    position: absolute;
    top: 1px;
    left: 1px;
  }

  #pwd .inputIco:nth-child(1) {
    padding-left: 3px;
  }

  .passwordVisibility {
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0px;
    right: 8px;
    cursor: pointer;
  }

  .verificationCode {
    float: right;
    display: block;
    width: 33%;
    height: 38px;
    margin-top: 5px;
  }

  .loginButton {
    margin-top: 15px;
    display: block;
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-radius: 2px;
    background: #ff662f;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border: 0;
  }

  .loginButton:hover {
    text-decoration: none;
    opacity: 0.85;
  }
</style>
