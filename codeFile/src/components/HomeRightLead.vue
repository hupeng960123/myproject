<template>
  <div class="leftContent">
    <div class="title">各地区执法检查数量排行</div>
    <div class="select1">
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
      <div v-for="(item,index) in dataList" :key="index" class="list">
        <div class="letIndex">{{index+1}}</div>
        <div class="right_content">
          <div class="pieMsg">
            <span>{{item.name}}</span>
            <span>{{item.count}}</span>
          </div>
          <div class="pieData" :style="{backgroundColor:item.color,width:item.width}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {api_jsc_index_info} from "../services/index";
  import common from "../utils/common";

  export default {
    name: 'HomeRightLead',
    data() {
      return {
        value2: '',
        dataList: [],
        colorList: ['#4084F0', '#FFB400', '#00CD74', '#FF5656', '#165AC6', '#9B64FF', '#FFF45C', '#71e8ef', '#f262b3', '#e1f40c'],
      }
    },
    mounted() {
      let params = {
        action: 1,
        sub_action: 5
      }
      this.getData(params)

    },
    methods: {
      getData(params) {
        api_jsc_index_info(params).then(res => {
          this.dataList = []
          if (res.c == 0) {
            res.d.name1_list.forEach((item, index) => {
              let obj = {
                name: item,
                count: res.d.value1_list[index]
              }
              this.dataList.push(obj)
            })
            this.dataList.forEach((item, index) => {
              if (index == 0) {
                item.width = '100%'
              } else {
                if (item.count) {
                  item.width = Math.floor(item.count / this.dataList[0].count * 100) + '%'
                } else {
                  item.width = '10px'
                }
              }
              item.color = this.getColor(index)
            })
          }
        })
      },
      getColor(index) {
        if (index > 90) {
          return this.colorList[index]
        } else {
          return this.colorList[index % 10]

        }
      },
      selectChange() {
        let params = {
          action: 1,
          sub_action: 5
        }
        if (this.value2) {
          params.start_date = common.changeDateType(this.value2)
        }
        this.getData(params)
      }
    }

  }
</script>
<style scoped>
  .leftContent {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #484B52;
  }

  .select1 {
    position: absolute;
    top: 10px;
    right: 15px;
  }

  .content {
    height: calc(100% - 40px);
    margin-top: 20px;
    overflow-y: auto;
    width: 100%;
  }

  .list {
    height: 40px;
    font-size: 0;
    padding: 10px 0;
  }

  .letIndex {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    width: 50px;
    font-size: 14px;
    box-sizing: border-box;
    padding: 5px 10px;
  }

  .right_content {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    width: calc(100% - 60px);
    font-size: 14px;
    padding-right: 10px;
  }

  .pieMsg {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .pieData {
    display: inline-block;
    height: 8px;
    box-sizing: border-box;
  }
</style>