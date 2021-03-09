<template>
  <div class="charBox">
    <div class="title">{{titleName}}</div>
    <div class="headBox">
      <div class="head_btn" :style="{borderColor:this.color}">
        <div v-for="(item,index) in headData" :key="index"
             class='head_list' @click="changeChart(index)" :style="setHeadStyle(index)">
          {{item}}
        </div>
      </div>
    </div>
    <div class="charTitle">
      <div class="charName" v-if="!isDb">{{headData[activeIndex]}}</div>
      <div class="charName" v-else>
        <div style="display: inline-block;width: 260px;" v-for="(item,index) in headList[this.activeIndex]" :key="index">
          {{item}}
        </div>
      </div>
      <div v-if="isDb">
        <div class="list_item" v-for="(item,index) in sumArray[activeIndex]" :key="index">
          <div class="list" v-for="(item2,index2) in item" :key="index2" :style="numStyle(sumArray[activeIndex].length,index)">
            {{item2}}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="list" v-for="(item,index) in sumArray[activeIndex]" :key="index"
             :style="numStyle()">
          {{item}}
        </div>
      </div>
    </div>
    <div class="chartContent">
      <div class="charDom" ref="charDom"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BarChart',
    props: {
      titleName: {
        default: ''
      },
      headData: {
        type: Array
      },
      data_x: {
        type: Array
      },
      data_y: {
        type: Array
      },
      color: {
        default: ''
      },
      headList: {
        type: Array
      }
    },
    data() {
      return {
        activeIndex: 0,
        sumArray: [],
        isDb: false
      }
    },
    mounted() {
      let type = typeof this.data_y[0][0]
      if (type == 'object') {
        this.isDb = true
        let array = []
        this.data_y[0].forEach(item => {
          let num = 0
          item.forEach((item2) => {
            num += item2
          })
          array.push(String(num))
        })
        this.sumArray.push(array)
        let num2 = 0
        this.data_y[1].forEach(item => {
          num2 += item
        })
        this.sumArray.push([String(num2)])
      } else {
        this.data_y.forEach((item) => {
          let num = 0
          item.forEach((item_child) => {
            num += item_child
          })
          this.sumArray.push(String(num))
        })
      }

      this.initChar()
    },
    methods: {
      initChar() {
        let series = [
          {
            name: this.headData[this.activeIndex],
            type: 'bar',
            barWidth: 16,
            barGap: 0,
            data: this.data_y[this.activeIndex]
          }
        ]
        let isDb = false
        if (typeof this.data_y[this.activeIndex][0] == 'object') {
          isDb = true
        }
        if (isDb) {
          series = []
          this.data_y[this.activeIndex].forEach((item, index) => {
            series.push({
              name: this.headList[this.activeIndex][index],
              type: 'bar',
              barWidth: 16,
              barGap: 0,
              data: item
            })
          })
        }
        if (this.chart1) {
          this.chart1.dispose()
        }
        let echarts = require("echarts");
        this.chart1 = echarts.init(this.$refs.charDom);
        this.chart1.setOption({
          color: isDb ? ['#FFB400', '#9B64FF'] : this.color,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            height: 220
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
          },
          xAxis: [
            {
              name: '地区',
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
              type: 'value',
              name: '数量',
              nameTextStyle: {
                align: 'right'
              }
            }
          ],
          series: series
        })
      },
      changeChart(index) {
        this.activeIndex = index
        this.initChar()
      },
      numStyle(allLength, index) {
        let obj = {}
        if (allLength && allLength >= 2) {
          obj.color = ['#FFB400', '#9B64FF'][index]
          obj.border = `1px dashed ${['#FFB400', '#9B64FF'][index]}`
        } else {
          if (this.color) {
            obj.color = this.color
            obj.border = `1px dashed ${this.color}`
          }
        }
        return obj
      },
      setHeadStyle(index) {
        let obj = {}
        if (index == this.activeIndex) {
          obj.color = '#ffffff'
          obj.backgroundColor = this.color
        } else {
          obj.color = this.color
          obj.borderRight = `1px solid ${this.color}`
        }
        return obj
      }
    }
  }
</script>
<style scoped>
  .charBox {
    width: 100%;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
    padding: 0;
  }

  .title {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #484B52;
  }

  .charTitle {
    position: absolute;
    height: 79px;
    top: 68px;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .list_item {
    display: inline-block;
    width: 260px;
  }

  .list {
    display: inline-block;
    height: 40px;
    width: 30px;
    margin: 0 3px;
    text-align: center;
    line-height: 40px;
    font-size: 32px;
    /*font-weight: 600;*/
  }

  .charName {
    font-size: 14px;
    font-weight: 600;
    color: #484B52;
    margin-bottom: 15px;
  }

  .headBox {
    text-align: center;
    padding-top: 20px;
  }

  .head_btn {
    border-radius: 5px;
    border: 1px solid;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 0;
  }

  .head_list {
    display: inline-block;
    vertical-align: top;
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
  }

  .head_list:last-child {
    border: none !important;
  }

  .chartContent {
    margin-top: 10px;
    width: 100%;
  }

  .charDom {
    width: 100%;
    height: 420px;
    margin-top: 50px;
  }
</style>