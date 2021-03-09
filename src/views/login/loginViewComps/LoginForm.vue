<template>
  <div class="loginForm">
    <ol>
      <li style="margin-bottom: 25px">
        <p class="label">手机号</p>
        <div class="inputBox" style="position: relative">
          <em class="inputIco">
            <img src="~assets/img/login/login_mobile.png">
          </em>
          <input type="text" placeholder="请输入手机号" v-model="phone" @blur="phoneInputBlur"/>
          <div class="phoneTip">
            <div>{{ phonePatternTip }}</div>
          </div>
        </div>
      </li>
      <li v-if="!isShowPassword">
        <p class="label">密码</p>
        <div class="inputBox">
          <em class="inputIco">
            <img src="~assets/img/login/login_password.png">
          </em>
          <input type="password" placeholder="请输入密码" v-model="password"/>
          <em class="passwordVisibility" @click="isShowPasswordImgClick">
            <img src="~assets/img/login/input_close.png">
          </em>
        </div>
      </li>
      <li v-else>
        <p class="label">密码</p>
        <div class="inputBox">
          <em class="inputIco">
            <img src="~assets/img/login/login_password.png">
          </em>
          <input type="text" placeholder="请输入密码" v-model="password"/>
          <em class="passwordVisibility" @click="isShowPasswordImgClick">
            <img src="~assets/img/login/input_look.png">
          </em>
        </div>
      </li>
      <li>
        <p class="label">验证码</p>
        <div class="clearFix">
          <div class="inputBox" style="float: left">
            <em class="inputIco">
              <img src="~assets/img/login/login_erification.png">
            </em>
            <input type="text" maxlength="4" placeholder="请输入验证码" v-model="verCode"/>
          </div>
          <img src="https://www.ommdata.com/ran/ajax/random" alt="验证码，点击图片更换"
               class="verificationCode" maxlength="4"
               onclick="this.src='https://www.ommdata.com/ran/ajax/random?random='+Math.random();"/>
        </div>
      </li>
      <li>
        <button class="loginButton" @click="commitLogin">登录</button>
      </li>
    </ol>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import {requestLogin} from "network/login";

  export default {
    name: "LoginForm",
    data() {
      return {
        phonePatternTip: '',
        isShowPassword: false,
        phone: '',
        password: '',
        verCode: ''
      }
    },
    computed: {
      ...mapGetters(['loginStatus'])
    },
    methods: {
      //事件监听相关的方法

      //当手机号输入框失去焦点时,检测格式是否正确
      phoneInputBlur() {
        const pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!pattern.test(this.phone)) {
          this.phonePatternTip = "请输入正确的手机号!"
        } else {
          this.phonePatternTip = ''
        }
      },
      //密码是否可见点击事件
      isShowPasswordImgClick() {
        this.isShowPassword = !this.isShowPassword
      },
      // 登录按钮点击事件
      // commitLogin() {
      //   向服务器发送登录请求
      //   requestLogin(username, password, verCode).then(res => {
      //     ------------------
      //   })
      // }
      // 登录按钮点击事件,直接登录成功,'123'为测试用的sessionId

      commitLogin() {
        const user = {
          name: this.phone,
          pwd: this.password
        }
        axios.post('http://localhost:8181/login', user).then(function (resp) {
          console.log(resp)
        })

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
  .loginForm {
    margin-top: 30px;
  }

  .phoneTip {
    position: absolute;
    top: 40px;
    left: 0px;
    font-size: 10px;
    color: red;
    height: 10px;
  }

  .label {
    font-size: 14px;
    margin-top: 15px;
    color: #333;
    margin-left: 5px;
  }

  .inputBox {
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

  .passwordVisibility {
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 9px;
    right: 8px;
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
