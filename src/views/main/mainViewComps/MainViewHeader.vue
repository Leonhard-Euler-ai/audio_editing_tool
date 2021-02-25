<template>
  <!--  <header class="clearFix" style="padding: 0 100px">-->
  <!--    <div class="logo">-->
  <!--      <img src="https://www.ommdata.com/images/upload/websiteLogo/20210219/1613702757354T0CaKD.png" alt="文思海辉教育平台">-->
  <!--    </div>-->
  <!--    <div class="menu">-->
  <!--      <ul>-->
  <!--        <li>-->
  <!--          <a href="#">首页</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <a href="#">在线课程</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <a href="#">直播</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <a href="#">在线测评</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <a href="#">讲师</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <a href="#">更多</a>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--      <ul style="float:right">-->
  <!--        <li class="search">-->
  <!--          <input type="text" placeholder="搜索...">-->
  <!--          <em class="searchIcon iconFont"></em>-->
  <!--        </li>-->
  <!--        <li class="personalCenter">-->
  <!--          <a href="#">-->
  <!--            <em class="iconFont"></em>个人中心-->
  <!--          </a>-->
  <!--        </li>-->
  <!--        <li class="mobileClient">-->
  <!--          <img src="~assets/img/login/login_mobile.png">下载APP-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--    </div>-->
  <!--  </header>-->
  <header>
    <el-steps active="1" simple>
      <el-step title="上传视频" icon="el-icon-upload"></el-step>
      <el-step title="编辑视频" icon="el-icon-edit"></el-step>
      <el-step title="确认更改" icon="el-icon-success"></el-step>
    </el-steps>
  </header>
</template>

<script>
  export default {
    name: "MainViewHeader"
  }
</script>

<style scoped>
  header {
    width: 60%;
    margin: 20px 0 0 100px;
  }

  /*.logo {*/
  /*  float: left;*/
  /*  font-size: 36px;*/
  /*  line-height: 45px;*/
  /*  width: 100px;*/
  /*  height: 66px;*/
  /*  margin: 0 auto;*/
  /*  position: relative;*/
  /*}*/

  /*.logo img {*/
  /*  width: auto;*/
  /*  text-align: center;*/
  /*  vertical-align: middle;*/
  /*}*/

  /*li {*/
  /*  float: left;*/
  /*}*/

  /*li a {*/
  /*  background-color: #fff;*/
  /*  color: #333;*/
  /*  display: block;*/
  /*  font-size: 16px;*/
  /*  line-height: 66px;*/
  /*  padding: 0 15px;*/
  /*  margin: 0 2px;*/
  /*  transition: .3s;*/
  /*  -webkit-transition: .3s;*/
  /*}*/

  /*li a:hover {*/
  /*  background-color: #ff662f;*/
  /*  text-decoration: none;*/
  /*  color: #fff;*/
  /*}*/

  /*.search {*/
  /*  position: relative;*/
  /*  border: 1px solid #eee;*/
  /*  border-radius: 20px;*/
  /*  color: #666;*/
  /*  font-family: "Microsoft YaHei";*/
  /*  height: 30px;*/
  /*  line-height: 30px;*/
  /*  margin: 15px 0 0 0;*/
  /*  padding: 0 30px 0 15px;*/
  /*  transition: all 0.3s ease 0s;*/
  /*  width: 110px;*/
  /*  -webkit-transition: .3s;*/
  /*  background-color: #f9f9f9;*/
  /*}*/

  /*.searchIcon {*/
  /*  position: absolute;*/
  /*  top: -3px;*/
  /*  right: 9px;*/
  /*  font-size: 15px;*/
  /*  cursor: pointer;*/
  /*}*/

  /*ul li.personalCenter a {*/
  /*  font-size: 14px;*/
  /*  text-align: center;*/
  /*}*/

  /*ul li.personalCenter a:hover {*/
  /*  background-color: #fff;*/
  /*  text-decoration: none;*/
  /*  color: #ff662f;*/
  /*}*/

  /*ul li.mobileClient {*/
  /*  font-size: 14px;*/
  /*  text-align: center;*/
  /*  margin: 12px 0 0 0;*/
  /*}*/

  /*ul li.mobileClient:hover {*/
  /*  color: #ff662f;*/
  /*  cursor: pointer;*/
  /*}*/
</style>
