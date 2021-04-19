<template>
  <div id="administrator">
    <header>
      <h1>基于Element UI和ECharts的统计数据可视化</h1>
      <div class="showTime"></div>
    </header>

    <div>
      <div class="block" style="margin: 10px 0 0 80px">
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          align="right"
          unlink-panels
          focus
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="timeChange(timeValue)"
        >
        </el-date-picker>
      </div>
    </div>

    <section style="display: flex;">
      <aside style="flex: 3;">
        <div id="barGraph" class="pic"></div>
        <div id="pieGraph" class="pic"></div>
      </aside>

      <main style="flex: 5;">
        <div class="rightBox">
          <!--          <el-button @click="resetDateFilter" style="margin-bottom: 10px">清除日期过滤器</el-button>-->
          <!--          <el-button @click="clearFilter">清除所有过滤器</el-button>-->
          <el-table
            ref="filterTable"
            :data="tableData"
            stripe
            :fit="false"
            height="450"
            :row-style="rowStyle"
            style="width: 100%">
            <el-table-column type="expand" width="40">
              <template>
                <el-table
                  :data="partData"
                  border
                  stripe
                  style="width: 100%"
                  height="200">
                  <el-table-column
                    prop="partId"
                    label="分片编号"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="oldContent"
                    label="原文字"
                    width="323">
                  </el-table-column>
                  <el-table-column
                    prop="newContent"
                    label="现文字"
                    width="323">
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <!--            子表格结束-->
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="110"
              column-key="date"
            >
            </el-table-column>
            <el-table-column
              prop="videoId"
              label="视频ID"
              sortable
              width="90">
            </el-table-column>
            <el-table-column
              prop="videoName"
              label="视频名称"
              width="145">
            </el-table-column>
            <el-table-column
              prop="userId"
              label="教师ID"
              sortable
              width="90">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="教师名称"
              width="145"
              :filters="this.teacherSelect"
              :filter-method="filterHandler">
            </el-table-column>
            <el-table-column label="视频分片">
              <el-table-column
                prop="partNum"
                label="分片总数"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="modifiedNum"
                label="编辑片数"
                sortable
                width="110">
              </el-table-column>
            </el-table-column>
          </el-table>
          <p class="dataCount">共有{{this.tableData.length}}条数据</p>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
  import echarts from '../../plugins/echarts.min'
  import {requestEchartsData} from "network/echarts"

  export default {
    name: "AdministratorView",
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeValue: '',// 用户选择的时间区间，发送给服务器
        rowStyle: {'line-height': '20px'},

        //以下为折线图
        xAxis: [],// 折线图的X轴,单位是时间
        //yAxis:[],// 折线图的Y轴,单位是视频个数
        videoNum: [],//上传的视频数量
        modifiedNum: [],//修改的视频数量
        //注意上面的四个数组中,x轴和视频数的数组元素个数是一致的;Y轴的数据根据视频个数自定

        //以下为饼图
        userName: [],//有哪些老师显示在此,里面是姓名,如['张老师','王老师']
        pieData: [],//每个老师修改的视频片的数量,格式如下

        teacherSelect: [],//教师选择器,用于筛选指定的老师,[{text: '老师名字', value: '老师名字'}]
        tableData: [],
        partData: [{
          partId: '1',
          oldContent: '原视频片文字1',
          newContent: '现视频片文字1'
        }, {
          partId: '2',
          oldContent: '原视频片文字2',
          newContent: '现视频片文字2'
        }]
      };
    },
    mounted() {
      this.showLocalTime();
      this.drawBar();
      this.drawPie();
    },
    methods: {
      showLocalTime() {
        var t = null;
        t = setTimeout(time, 1000); //開始运行
        function time() {
          clearTimeout(t); //清除定时器
          var dt = new Date();
          var y = dt.getFullYear();
          var mt = dt.getMonth() + 1;
          var day = dt.getDate();
          var h = dt.getHours(); //获取时
          var m = dt.getMinutes(); //获取分
          var s = dt.getSeconds(); //获取秒
          document.querySelector(".showTime").innerHTML =
            "当前时间：" + y + "年" + mt + "月" + day + "日" + h + "时" + m + "分" + s + "秒";
          t = setTimeout(time, 1000); //设定定时器，循环运行
        };
      },
      drawBar() {
        // 基于dom，初始化echarts实例
        let barGraph = echarts.init(document.getElementById('barGraph'));
        // 绘制图表
        barGraph.setOption({
          title: {
            text: '上传及修改数量情况统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
          },
          legend: {
            left: 'center',
            data: ['上传视频数量', '修改视频数量'],
            bottom: 0
          },
          xAxis: {
            type: 'category',
            name: 'x',
            splitLine: {show: false},
            data: this.xAxis,

            // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '8%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            name: '      数量',//空格不要删
            minInterval: 1,
            splitLine: {show: true},
            min: (value) => {
              let num = 10 ** (value.min.toString().length - 2)
              return Math.floor(value.min / num) * num;
            },
            max: (value) => {
              let num = 10 ** (value.max.toString().length - 2)
              return Math.ceil(value.max / num) * num;
            }
            //data: this.yAxis
            // ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
          },
          series: [
            {
              name: '修改视频数量',
              type: 'line',
              data: this.modifiedNum
              // [1, 0.2, 0.4, 0.8, 0.16, 0.32, 0.64, 1.28, 5.6, 0.25, 0.63, 0.65, 0.12]
            }, {
              name: '上传视频数量',
              type: 'line',
              data: this.videoNum
              // [0.8, 0.98, 0.96, 0.27, 0.81, 0.47, 0.74, 0.23, .69, 0.25, 0.36, 0.56]
            }
          ]
        })
      },//折线图
      drawPie() {
        let pieGraph = echarts.init(document.getElementById('pieGraph'));
        pieGraph.setOption({
          title: {
            text: '教师上传视频修改数统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.userName
            // ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '教师上传视频修改数统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },//饼图

      // 检测到时间的改变就发送请求
      timeChange(dateRange) {
        if (dateRange[0] == null) {
          return
        }
        requestEchartsData(dateRange[0], dateRange[1]).then(axiosRes => {
          if (axiosRes.data.code === 200) {
            this.$message.success(axiosRes.data.message)

            let data = axiosRes.data.data;
            this.xAxis = data.xAxis
            this.videoNum = data.videoNum
            this.modifiedNum = data.modifiedNum
            this.userName = data.userName

            this.pieData = [];
            for (let i = 0; i < this.userName.length; i++) {
              this.pieData.push(new Object({
                'value': data.valueOfPieData[i],
                'name': this.userName[i]
              }))
            }
            this.drawBar();
            this.drawPie();
            this.tableData = []
            for (let i = 0; i < data.tablePartNum.length; i++) {
              this.tableData.push(new Object({
                'date': data.tableDate[i],
                'videoId': data.tableVideoId[i],
                'videoName': data.tableVideoName[i],
                'userId': data.tableUserId[i],
                'userName': data.tableUserName[i],
                'partNum': data.tablePartNum[i],
                'modifiedNum': data.tableModifiedNum[i]
              }))
            }

            this.teacherSelect = []
            let tableUserName = Array.from(new Set(data.tableUserName))
            for (let i = 0; i < tableUserName.length; i++) {
              this.teacherSelect.push(new Object({
                'text': tableUserName[i],
                'value': tableUserName[i],
              }))
            }
          }
        })
      },

      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: electronicFont;
    src: url("~assets/fonts/DS-DIGIT.TTF");
  }

  #administrator {
    width: 100%;
    height: 100%;
  }

  header {
    position: relative;
    height: 10%;
    background: url("~assets/img/administrator/head_bg.png") no-repeat;
    background-size: 100% 100%;
  }

  header h1 {
    color: white;
    font-size: 25px;
    text-align: center;
    line-height: 50px;
  }

  header .showTime {
    height: 20px;
    width: 275px;
    position: absolute;
    top: 10px;
    right: 10px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 16px;
    font-family: electronicFont;
  }

  section {
    margin-top: 20px;
    height: 100%;
  }

  #barGraph, #pieGraph, table {
    height: 40%;
    width: 90%;
    margin: 1px auto;
  }

  .rightBox {
    width: 100%;
    height: 90%;
    margin: auto;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .dataCount {
    font-weight: bold;
    font-size: 15px;
    color: #909399;
    margin-left: 725px;
    margin-top: 10px;
  }
</style>
