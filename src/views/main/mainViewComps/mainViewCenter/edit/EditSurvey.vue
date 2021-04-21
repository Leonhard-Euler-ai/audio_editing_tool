<template>
  <div class="editSurvey">
    <span>视频段起点：</span><span>{{startTimes[currentIndex]}}</span><span>视频段终点：</span><span>{{endTimes[currentIndex]}}</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <span><b class="iconFont"></b>编辑文本替换</span>
        </template>
        <div>
          <span class="original">识别文字结果：</span>
          <textarea disabled="disabled" wrap="physical" class="originalContent" v-model="currentContent"/>
        </div>
        <div>
          <span class="current">在此更改文字：</span>
          <textarea wrap="physical" class="currentContent" @blur="editTextareaBlur" v-model="editContent"/>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span @click="record"><b class="iconFont"></b>录制音频替换</span>
        </template>
        <div class="soundRecording">
          <el-button type="warning" round id="record_btn">开始录音</el-button>
          <el-button type="message" round id="upload_btn">上传录音</el-button>
        </div>
        <div class="soundPlay">
          <audio src="#" controls id="audio_player">抱歉，您的浏览器不支持录音功能，请更换浏览器或选择其他更改方式。</audio>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third">
        <template #label>
          <span><b class="iconFont"></b>上传录音替换</span>
        </template>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:8182/upload/mp3"
          :with-credentials="true"
          :file-list="fileList"
          :limit=1
          :data="{'currentIndex':currentIndex}"
          :on-success="uploadSuccess"
          :on-error="uploadFailed"
          :auto-upload="false">
          <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
          </template>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传一个音频文件，且文件大小不超过 10MB
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {requestPostMp3} from "network/mp3";
  import {requestEditByCharacter} from "network/edit"
  import {requestEdit} from "network/edit";
  import {requestImg} from "network/img";

  export default {
    name: "EditSurvey",
    props: {
      startTimes: {
        type: Array,
        default() {
          return []
        }
      },
      endTimes: {
        type: Array,
        default() {
          return []
        }
      },
      contents: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      contents(newValue) {
        this.originalContents = new Object(newValue)
        this.editContents = JSON.parse(JSON.stringify(newValue))
      }
    },
    mounted() {
      this.$Bus.$on("imgClick", object => {
        this.currentIndex = object.index;
        this.currentContent = this.originalContents[object.index]
        this.editContent = this.currentContent
      })

      this.$Bus.$on("finishEdit", () => {
        let promises = []

        // 首先判断两个文字数组中不同的元素，将不同元素依次上传到服务器
        console.log("原文字片长度" + this.originalContents.length);
        for (let i = 0; i < this.originalContents.length; i++) {
          if (this.originalContents[i] !== (this.editContents[i])) {
            console.log("当前视频片的文字被更改了，视频编号为" + i)
            promises.push(requestEditByCharacter(i, this.editContents[i]).then(res => {
            }))
          }
        }
        Promise.all(promises).then(res => {
          console.log("文字的合成请求也已经发送完毕，开始请求图片")
          // 所有文字片段后台合成成功
          // 触发事件，传送更改后的数据给父组件，以便给Submit.vue界面prop赋值
          requestEdit().then(axiosRes => {
            if (axiosRes.data.code === 200) {
              let originalData = axiosRes.data.data.modifiedPart;
              // 所有更改过的片段首帧图片urls
              let imgURLs = originalData.imageUrl
              //给后台返回数据对象增加imgBlob数组
              originalData.imgBlobs = []
              originalData.imgSrcs = []

              let promises = []
              //依次请求依次给blob数组增加元素
              for (let i = 0; i < originalData.num; i++) {
                promises.push(requestImg(imgURLs[i]).then(res => {
                  originalData.imgBlobs[i] = res.data
                  let url = URL.createObjectURL(res.data)
                  originalData.imgSrcs[i] = url
                }))
              }
              Promise.all(promises).then(res => {
                this.$Bus.$emit("beforeSubmitViewCreated", originalData)
              })
            }
          })
        })


      })
    },
    data() {
      return {
        originalContents: new Object(this.contents),
        editContents: JSON.parse(JSON.stringify(this.contents)),

        currentIndex: 0,
        // currentContent: this.originalContents[0] ? this.originalContents[0] : "",
        currentContent: "点击下方视频帧图片加载",
        editContent: this.currentContent,

        activeName: 'first',
        fileList: [],
      };
    },
    methods: {
      editTextareaBlur() {
        this.editContents[this.currentIndex] = this.editContent
        console.log("当前index为:" + this.currentIndex + ",更改后的内容为:" + this.editContent)
        //console.log(this.currentContent)
        // console.log(this.originalContents)
        // console.log(this.editContents)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      record() {
        const recordBtn = document.querySelector("#record_btn");
        const player = document.querySelector("#audio_player");
        const uploadBtn = document.querySelector("#upload_btn")
        // 先判断是否支持getUserMedia API
        if (navigator.mediaDevices.getUserMedia) {
          console.log("浏览器获得getUserMedia支持");

          const constrains = {audio: true};
          var chunks = [];
          var blob = null;

          navigator.mediaDevices.getUserMedia(constrains)
            .then(
              stream => {
                // 回调入参stream为MediaStream对象
                console.log("授权成功");

                const mediaRecorder = new MediaRecorder(stream);
                // visualize(stream);

                recordBtn.onclick = () => {
                  if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();

                    recordBtn.style.background = "";
                    recordBtn.style.color = "";
                    recordBtn.textContent = "重新录音";
                    console.log("录音结束");
                  } else {
                    mediaRecorder.start();

                    recordBtn.style.background = "red";
                    recordBtn.style.color = "black";
                    recordBtn.textContent = "暂停录音";
                    console.log("录音中...");
                  }
                  console.log("录音器状态：", mediaRecorder.state);
                };

                // 点击上传按钮将已经获得的blob格式转换为file格式传给后端
                uploadBtn.onclick = () => {
                  if (blob == null) {
                    console.log("当前无录音文件");
                    this.$message.warning("当前无录音文件,请重新录制")
                  } else {
                    const filename = "audioRecord";
                    // file为当前录音文件转换为的file文件格式
                    const file = new File([blob], filename, {type: blob.type});

                    const formData = new FormData();
                    formData.append("file", file);
                    requestPostMp3(this.currentIndex, formData).then(res => {
                      if (res.data.code === 200) {
                        this.$message.success(res.data.message)
                      }
                    })
                    console.log("请继续测试blob文件是否已经转为所需要的file格式供后端使用");
                  }
                };

                // 获取音频数据存放到数组
                mediaRecorder.ondataavailable = e => {
                  chunks.push(e.data);
                };

                // 结束录音
                mediaRecorder.onstop = e => {
                  blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
                  chunks = []
                  player.src = window.URL.createObjectURL(blob);
                };
              },
              () => {
                console.error("授权失败");
              }
            );

        } else {
          console.log("浏览器不支持getUserMedia");
        }

      },
      uploadSuccess(response, file, fileList) {
        if (response.code === 200) {
          this.$message.success(response.message);
          this.fileList = fileList;
        } else {
          this.$message.warning(response.message);
        }
      },

      uploadFailed(err, file, fileList) {
        this.$message.error("上传失败！");
      },
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
