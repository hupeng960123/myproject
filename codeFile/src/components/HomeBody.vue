<template>
  <div class="mainContent">
    <div class="homeBody">
      <div class="title">执法检查</div>
      <div class="select_1">
        <el-select v-model="value1" multiple collapse-tags placeholder="请选择单位" size="small" style="width: 220px;"
                   @change="selectChange">
          <el-option
            v-for="item in jg_select"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]">
          </el-option>
        </el-select>
      </div>
      <div class="select_2">
        <el-date-picker
          @change="selectChange"
          v-model="value2"
          type="year"
          size="small"
          style="width: 120px;"
          placeholder="请选择年">
        </el-date-picker>
      </div>
      <div class="content">
        <div style="position: relative">
          <div class="title_char1">按类型统计分析</div>
          <div id="charBox1"></div>
        </div>
        <div style="position: relative">
          <div class="title_char1">按单位统计分析</div>
          <div id="charBox2"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span v-if="link_data_dict" class="btn" @click="linkClick(link_data_dict)">{{link_data_dict.name}}</span>
      <div class="title">我的待办</div>
      <div class="f_c">
        <div class="f_c_li f_c_li_head">
          <span class="s_1">日期</span>
          <span class="s_2">内容</span>
          <span class="s_3">当前处理人</span>
          <span class="s_3">环节</span>
          <span class="s_4">状态</span>
        </div>
        <div class="f_c_li" v-for="(item,index) in data_db" :key="index">
          <span class="s_1">{{item.begin_time}}</span>
          <span class="s_2">{{item.title}}</span>
          <span class="s_3">{{item.approval_user}}</span>
          <span class="s_3">{{item.label}}</span>
          <span class="s_4" :style="{color:item.color}">{{item.flow_state}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {api_jsc_index_info} from "../services/index";
  import common from "../utils/common";

  export default {
    name: 'HomeBody',
    props: {
      jg_select: {
        default: []
      }
    },
    data() {
      return {
        value1: '',
        options: [],
        value2: '',
        chart1: null,
        chart2: null,
        pieData: [],
        data_x: ['湖北省应急响应局', '武汉市应急响应局', '十堰市应急响应局', '十堰市应急响应局', '十堰市应急响应局', '十堰市应急响应局', '十堰市应急响应局', '十堰市应急响应局'],
        data_y1: [],
        data_y2: [],
        data_db: [],
        link_data_dict: null
      }
    },
    mounted() {
      let params = {
        action: 1,
        sub_action: 2
      }
      this.getData(params)
      //我的待办任务
      api_jsc_index_info({action: 1, sub_action: 3}).then(res => {
        if (res.c == 0) {
          this.data_db = res.d.data_list
          this.link_data_dict = res.d.link_data_dict
        }
      })
    },
    methods: {
      getData(params) {
        api_jsc_index_info(params).then(res => {
          if (res.c == 0) {
            let data = res.d
            //饼图
            let sum1 = 0
            data.value1_list.forEach((item) => {
              sum1 += item * 1
            })
            data.name1_list.forEach((item, index) => {
              let obj = {
                name: item,
                value: data.value1_list[index],
                pie: (data.value1_list[index] / sum1 * 100).toFixed(2) + '%'
              }
              this.pieData.push(obj)

            })
            //柱状图
            this.data_x = data.name2_list
            this.data_y1 = data.value2_list
            this.data_y2 = data.value3_list
            this.initChar()
          }
        })
      },
      initChar() {
        let echarts = require("echarts");
        this.chart1 = echarts.init(document.getElementById("charBox1"));
        this.chart1.setOption({
          tooltip: {
            trigger: 'item',
            position: (point) => {
              return [point[0] + 20, point[1]];
            },
            formatter: (params) => {
              let result = ''
              result = `<span style="font-size: 20px;font-weight: 600">${params.data.name}</span><div><span>${params.data.value}<span>个</span></span></div><div><span>${params.data.pie}</span></div>`
              return result
            }
          },
          legend: {
            show: false
          },
          series: [
            {
              name: '数量',
              type: 'pie',
              minAngle: 3,
              radius: ['50%', '55%'],
              top: 20,
              label: {
                height: 50,
                formatter: (params) => {
                  let result = ''
                  // let str = params.data.zw.substr(0, 18)
                  // if (str.length == 18) {
                  //   str += '...'
                  // }
                  result =
                    `{a|${params.data.name}}\n` +
                    `{b|${params.data.value}个 ${params.data.pie}}\n`
                  // `{b|${str}}\n\n\n`
                  return result
                },
                rich: {
                  a: {
                    align: 'left',
                    fontSize: 16,
                    fontWeight: 600,
                    height: 30
                  },
                  b: {
                    align: 'left',
                    fontSize: 14,
                    lineHeight: 18
                  },
                }
              },
              labelLine: {
                length2: 20
              },
              width: '100%',
              left: 'center',
              data: this.pieData
            }
          ],
          color: ['#29B88A', '#EA5555', '#FFAC01', '#0492F2', '#3ee3fc', '#a729f7', '#f20ecf']
        })
        this.chart2 = echarts.init(document.getElementById("charBox2"));
        this.chart2.setOption({
          color: ['#4084F0', '#FFB400'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['检查次数', '被检查企业数'],
            top: 15,
            itemWidth: 30,
            itemHeight: 5,
          },
          grid: {
            height: 200
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.data_x,
              axisLabel: {
                formatter: function (value) {
                  return value.split("").join("\n");
                }
              }
            },
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],

          series: [
            {
              name: '检查次数',
              type: 'bar',
              barWidth: 10,
              barGap: 0,
              data: this.data_y1
            },
            {
              name: '被检查企业数',
              type: 'bar',
              barWidth: 10,
              data: this.data_y2
            },
          ]
        })
      },

      selectChange() {
        let params = {
          action: 1,
          sub_action: 2
        }
        if (this.value1 && this.value1.length > 0) {
          params.jg_ids = this.value1.join(',')
        }
        if (this.value2) {
          params.start_date = common.changeDateType(this.value2)
        }
        this.getData(params)
      },
      linkClick(item) {
        if (item.url) {
          common.redirect(item.url)
        }
      }
    }
  }
</script>
<style scoped>
  .mainContent {
    height: calc(100% - 130px);
    overflow: auto;
  }

  .homeBody {
    margin-top: 20px;
    height: 450px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
  }

  .footer {
    height: calc(100% - 490px);
    min-height: 200px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 20px;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
  }

  .btn {
    color: #4084F0;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 14px;
  }

  .select_1 {
    position: absolute;
    width: 138px;
    right: 226px;
    top: 8px;
  }

  .select_2 {
    position: absolute;
    width: 135px;
    right: 0;
    top: 8px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #484B52;
  }

  .content {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin-top: 15px;
  }

  #charBox1 {
    width: 500px;
    height: 390px;
    background-color: #F9F9F9;
  }

  #charBox2 {
    width: 700px;
    height: 390px;
    background-color: #F9F9F9;
  }

  .title_char1 {
    position: absolute;
    top: 10px;
    left: 20px;
    background-color: #EEEEEE;
    color: #444444;
    font-weight: 600;
    border-radius: 5px;
    padding: 4px 6px;
    z-index: 1;
    font-size: 14px;
  }

  .f_c {
    height: calc(100% - 35px);
    margin-top: 15px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .f_c_li {
    border-bottom: 1px solid #EEEEEE;
    padding: 10px 10px;
    font-size: 0;
  }

  .f_c_li span {
    display: inline-block;
    vertical-align: top;
    color: #484B52;
  }

  .f_c_li_head span {
    color: #7E848E;
  }

  .f_c_li .s_1 {
    width: 10%;
    font-size: 14px;
  }

  .f_c_li .s_2 {
    width: 55%;
    font-size: 14px;
  }

  .f_c_li .s_3 {
    width: 15%;
    font-size: 14px;
  }

  .f_c_li .s_4 {
    width: 5%;
    font-size: 14px;
  }
</style>