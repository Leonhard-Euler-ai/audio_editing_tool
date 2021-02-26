<template>
  <div>
    <div class="upload">
      <el-upload drag show-file-list
                 :accept="acceptFileTypes"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :limit="limitCount"
                 :on-exceed="fileCountExceed"
                 :file-list="fileList"

                 :before-upload="beforeUpload"
                 :on-progress="upLoading"
                 :on-success="uploadSuccess"
                 :on-error="uploadFailed"
                 :before-remove="beforeRemove">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">一次只能上传单个视频文件，且不超过2GB</div>
      </el-upload>
    </div>
    <div class="loading">
      <el-progress class="el-progress" type="circle" :percentage="videoUploadPercent"
                   :status="progressStatus"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      acceptFileTypes: ".jpg,.png,.mp3,.mp4,.ogg,.flv,.avi,.wmv,.rmvb",
      limitCount: 1,
      fileList: [],
      videoUploadPercent: 0,
      progressStatus: 'exception',
      headers:{'Access-Control-Allow-Origin': '*'}
    }
  },
  methods: {
    uploadPost() {
      //:http-request="uploadPost"
      console.log('post');
    },

    beforeUpload(file) {
      console.log(file.type);
      if (['image/jpeg', 'image/png', 'audio/mpeg', 'video/mp4', 'audio/ogg', 'video/flv',
        'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('上传文件只能是视频文件!');
        return false;
      }
      const isLt2G = file.size / 1024 / 1024 / 1024 < 1;
      if (!isLt2G) {
        this.$message.error('上传文件大小不能超过2GB!');
        return false;
      }
      return true;
    },

    upLoading(event, file, fileList) {
      this.progressStatus = 'success';
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },

    uploadSuccess(response, file, fileList) {
      this.videoUploadPercent = 100
      this.progressStatus = "success"
      this.$message.success('上传成功!');
      this.$emit("finishUpload");
      this.fileList = fileList;

      console.log(response);
      console.log(this.fileList);
    },

    uploadFailed() {
      this.progressStatus = "exception"
      this.$message.error("上传失败！");
    },

    beforeRemove() {
      this.fileList = [];
      this.$emit("removeOnlyFile")
    },

    fileCountExceed() {
      this.$message.warning("只能上传处理单个视频");
    }
  }
}
</script>

<style scoped>
.upload {
  display: inline-block;
  width: 38%;
  margin: 80px 0 0 150px;
}

.loading {
  display: inline-block;
}

.el-progress {
  margin: 20px 10px;
}
</style>
