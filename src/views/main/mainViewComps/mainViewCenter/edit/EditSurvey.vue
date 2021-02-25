<template>
  <div class="editSurvey">
    <span>视频段起点：</span><span>????</span><span>视频段终点：</span><span>????</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <span><b class="iconFont"></b>编辑文本替换</span>
        </template>
        <div>
          <span class="original">识别文字结果：</span>
          <textarea disabled="disabled" wrap="physical" class="originalContent">123</textarea>
        </div>
        <div>
          <span class="current">在此更改文字：</span>
          <textarea wrap="physical" class="currentContent">123</textarea>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span><b class="iconFont"></b>录制音频替换</span>
        </template>
        <div class="soundRecording">
          <el-button type="warning" round>点击按钮以开始录音</el-button>
        </div>
        <div class="soundPlay">
          <audio src="#" controls>抱歉，您的浏览器不支持录音功能，请更换浏览器或选择其他更改方式。</audio>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third">
        <template #label>
          <span><b class="iconFont"></b>上传录音替换</span>
        </template>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
          </template>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传一个 mp3 文件，且文件大小不超过 50mb
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "EditSurvey",
    data() {
      return {
        activeName: 'first',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>
  .editSurvey {
    display: inline-block;
    width: 560px;
    height: 315px;
    margin: 20px 100px 10px 20px;
  }

  .editSurvey > span {
    display: inline-block;
    width: 100px;
    height: 30px;
    margin: 20px 15px;
  }

  .editSurvey > span:nth-child(1) {
    margin-left: 35px;
  }

  .original {
    display: inline-block;
    float: left;
    padding: 10px 0 0 10px;
    width: 25%;
    height: 100px;
  }

  .current {
    display: inline-block;
    float: left;
    padding: 10px 0 0 10px;
    width: 25%;
    height: 100px;
  }

  .originalContent {
    width: 300px;
    height: 100px;
    margin-bottom: 1px;
    border: solid 1px gray;
    resize: none;
  }

  .currentContent {
    width: 300px;
    height: 100px;
    border: solid 1px gray;
    resize: none;
  }

  .soundRecording {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }

  .soundPlay {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }

  .upload-demo {
    margin: 20px 80px 0 50px;
  }
</style>
