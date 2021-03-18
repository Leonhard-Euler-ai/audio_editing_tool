<template>
  <div>
    <div class="upload">
      <el-upload drag show-file-list
                 name="file"
                 :accept="acceptFileTypes"
                 :action="action"
                 :with-credentials="true"
                 :headers="headers"
                 :limit="limitCount"
                 :file-list="fileList"
                 :on-exceed="fileCountExceed"
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
      action: "http://localhost:8182/upload/video",
      headers: {
        token: this.$store.state.token
      }
    }
  },
  methods: {
    beforeUpload(file) {
      // 控制台输出文件类型，测试用
      console.log("上传文件类型: " + file.type);

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

      // 文件上传成功后控制台输入信息，测试用
      console.log("上传成功后upload组件的响应(真正结果在network中查看)： " + response.toString());
      console.log("上传成功后的文件列表： " + this.fileList.length);
    },

    uploadFailed(err, file, fileList) {
      this.progressStatus = "exception"
      this.$message.error("上传失败！");
    },

    beforeRemove() {
      this.fileList = [];
      this.$emit("removeOnlyFile")
    },

    // 当所传文件大小超过限制格式的监听事件,已设为1
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
