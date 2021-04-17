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
    <!--    <div class="loading">-->
    <!--      <el-progress class="el-progress" type="circle" :percentage="videoUploadPercent"-->
    <!--                   :status="progressStatus"></el-progress>-->
    <!--    </div>-->
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="观看权限">
          <el-select v-model="form.region" placeholder="请选择上传的专栏" value="">
            <el-option label="会员免费" value=""></el-option>
            <el-option label="付费观看" value=""></el-option>
            <el-option label="免费观看" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定时上传">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">------</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="允许弹幕">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <!--        <el-form-item label="课程类别">-->
        <!--          <el-checkbox-group v-model="form.type">-->
        <!--            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
        <!--            <el-checkbox label="地推活动" name="type"></el-checkbox>-->
        <!--            <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
        <!--            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        <!--          </el-checkbox-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="课程类别">
          <el-radio-group v-model="form.resource">
            <el-radio label="芯片技术"></el-radio>
            <el-radio label="操作系统"></el-radio>
            <el-radio label="数据库"></el-radio>
            <el-radio label="信息安全"></el-radio>
            <el-radio label="中间件"></el-radio>
            <el-radio label="办公套件"></el-radio>
            <el-radio label="云计算与大数据"></el-radio>
            <el-radio label="后端开发"></el-radio>
            <el-radio label="Web前端"></el-radio>
            <el-radio label="信创课程"></el-radio>
            <el-radio label="数字化课程"></el-radio>
            <el-radio label="综合类课程"></el-radio>
            <el-radio label="实训类课程"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="视频介绍">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
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
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
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
      this.$message.info('上传进行中，请不要退出此界面，该过程可能会持续几分钟');
      return true;
    },

    upLoading(event, file, fileList) {
      this.progressStatus = 'success';
      // this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
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
  float: left;
  display: inline-block;
  width: 38%;
  margin: 120px 0 0 150px;
}

.form {
  float: left;
  display: inline-block;
  width: 40%;
  margin: 50px 30px 0 0;
}

.el-progress {
  margin: 20px 10px;
}
</style>
