<template>
  <div>
    <div class="videoPlay">
      <video
        :src="videoSrc"
        ref="modifiedVideo"
        autoplay controls
        poster="~assets/img/video.jpg">
      </video>
    </div>
    <div class="form">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="1"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传视频封面</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
        <el-form-item label="文字水印">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频尺寸">
          <el-select v-model="form.region1" placeholder="请选择播放尺寸" value="">
            <el-option label="480P" value=""></el-option>
            <el-option label="720P" value=""></el-option>
            <el-option label="1080P" value=""></el-option>
            <el-option label="1920*1080(强制)" value=""></el-option>
            <el-option label="1080*1920(强制)" value=""></el-option>
            <el-option label="保留原素材长宽比" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加急审核">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="视频帧率">
          <el-radio-group v-model="form.resource">
            <el-radio label="25"></el-radio>
            <el-radio label="15"></el-radio>
            <el-radio label="30"></el-radio>
            <el-radio label="60"></el-radio>
            <el-radio label="原素材"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="音频质量">
          <el-select v-model="form.region2" placeholder="请选择音频质量" value="">
            <el-option label="48000Hz,128kbps" value=""></el-option>
            <el-option label="44100Hz,192kbps" value=""></el-option>
            <el-option label="48000Hz,192kbps" value=""></el-option>
            <el-option label="44100Hz,320kbps" value=""></el-option>
            <el-option label="44100Hz,128kbps(推荐)" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="message" round @click="finalSubmit">保存并退出系统</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayView",
    mounted() {
      this.$Bus.$on("mergeClick", videoUrl => {

        this.videoSrc = videoUrl;
        console.log("src" + this.videoSrc)
        this.$refs.modifiedVideo.load();
      })
    },
    data() {
      return {
        fileList: [],
        videoSrc: '#',
        form: {
          name: '',
          region1: '',
          region2: '',
          delivery: false,
          resource: ''
        }
      }
    },
    methods: {
      finalSubmit() {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "info"
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.$router.push('/main')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .videoPlay {
    float: left;
    display: inline-block;
    width: 38%;
    margin: 120px 0 0 100px;
  }

  video {
    display: inline-block;
    float: left;
    margin: 20px 20px 10px 0;
    width: 560px;
    height: 315px;
  }

  .form {
    float: left;
    display: inline-block;
    width: 30%;
    margin: 80px 0 0 80px;
  }
</style>
