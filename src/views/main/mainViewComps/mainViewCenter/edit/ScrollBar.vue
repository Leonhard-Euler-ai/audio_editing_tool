<template>
  <div class="scrollBar">
    <ul>
      <li v-for="(item,index) in videoImgInfos2" :key="index">
        <el-tooltip effect="light" placement="top">
          <template #content>
            起始时间点：{{item.startTime}}
            <br/>
            结束时间点：{{item.endTime}}
          </template>
          <img :src="item.imgSrc" alt=""
               @click="scrollBarTipClick(index)"
               ref="img"
          >
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
  import ScrollBarTips from "./ScrollBarTips";

  export default {
    name: "ScrollBar",
    components: {
      ScrollBarTips
    },
    props: {
      parent: '',
      videoImgInfos: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      videoImgInfos(newValue) {
        this.videoImgInfos2 = newValue
        for (let i in this.videoImgInfos2) {
          console.log(this.videoImgInfos2[i])
        }
        console.log("imginfos2" + this.videoImgInfos2)
      }
    },
    data() {
      return {
        videoImgInfos2: this.videoImgInfos,
        imgURL: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.yao51.com%2Fjiankangtuku%2Fgchllohmkv.jpeg&refer=http%3A%2F%2Fimg.yao51.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621219923&t=6ff1cfebee87c3a82be52dcb4d39e111'
      }
    },
    methods: {
      scrollBarTipClick(index) {
        // this.$message.success("点击下方第" + index + "个图片，发送请求")
        this.$Bus.$emit("imgClick", {index, 'parent': this.parent})
      }
    }
  }
</script>

<style scoped>
  .scrollBar {
    position: fixed;
    bottom: 12%;
    width: 100%;
    height: 100px;
    padding: 10px 30px;
  }

  ul {
    white-space: nowrap;
    overflow-x: auto;
  }

  li {
    display: inline-block;
    margin: 0 3px;
    width: 160px;
    height: 90px;
  }

  li:hover {
    position: relative;
    top: -2px;
    left: -2px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, .3);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
