<template>
  <div class="content">
    <div class="headSelect">
      <el-date-picker
        size="small"
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span class="btn" @click="search">查询</span>
    </div>
    <BarChart v-if="title1" style="margin-top: 20px;" :color="color1" :titleName="title1" :headData="headData1"
              :data_x="data_x1"
              :data_y="data_y1"></BarChart>
    <BarChart v-if="title2" style="margin-top: 20px;" :color="color2" :titleName="title2" :headData="headData2"
              :data_x="data_x2"
              :data_y="data_y2"></BarChart>
    <BarChart v-if="title3" style="margin-top: 20px;" :color="color3" :titleName="title3" :headData="headData3"
              :data_x="data_x3"
              :headList="headList"
              :data_y="data_y3"></BarChart>
  </div>
</template>
<script>
  import {api_jsc_index_info} from "../services/index";
  import BarChart from "../components/BarChart";

  export default {
    name: 'Statistics',
    components: {BarChart},
    data() {
      return {
        value1: '',
        title1: '',
        headData1: [],
        data_x1: [],
        data_y1: [],
        color1: '#4084F0',
        title2: '',
        headData2: [],
        data_x2: [],
        data_y2: [],
        color2: '#53CE46',
        title3: '',
        headData3: [],
        data_x3: [],
        data_y3: [],
        headList: [],
        color3: '#FFB400'
      }
    },
    mounted() {
      let params = {
        action: 2,
        sub_action: 1
      }
      this.getData(params)
    },
    methods: {
      getData(params) {
        api_jsc_index_info(params).then(res => {
          if (res.c == 0) {
            this.value1 = [res.d.start_date, res.d.end_date]
            this.title1 = res.d.data_dict1.title
            this.headData1 = res.d.data_dict1.z_list
            this.data_x1 = res.d.data_dict1.x_list
            this.headData1.forEach((item, index) => {
              this.data_y1.push(res.d.data_dict1['y_list' + (index + 1)])
            })
            //
            this.title2 = res.d.data_dict2.title
            this.headData2 = res.d.data_dict2.z_list
            this.data_x2 = res.d.data_dict2.x_list
            this.headData2.forEach((item, index) => {
              this.data_y2.push(res.d.data_dict2['y_list' + (index + 1)])
            })
            //
            this.title3 = res.d.data_dict3.title
            this.headData3 = [res.d.data_dict3.z_list[0] + ',' + res.d.data_dict3.z_list[1], res.d.data_dict3.z_list[2]]
            this.data_x3 = res.d.data_dict3.x_list
            this.data_y3.push([res.d.data_dict3.y_list1, res.d.data_dict3.y_list2])
            this.data_y3.push(res.d.data_dict3.y_list3)
            this.headList = [[res.d.data_dict3.z_list[0], res.d.data_dict3.z_list[1]], [res.d.data_dict3.z_list[2]]]
          }
        })
      },
      search() {
        this.title1 = ''
        this.title2 = ''
        this.title3 = ''
        this.headData1 = []
        this.data_x1 = []
        this.data_y1 = []
        this.headData2 = []
        this.data_x2 = []
        this.data_y2 = []
        this.headData3 = []
        this.data_x3 = []
        this.data_y3 = []
        this.headList = []
        let params = {
          action: 2,
          sub_action: 1
        }
        if (this.value1) {
          params.start_date = this.value1[0]
          params.end_date = this.value1[1]
        }
        this.getData(params)
      }
    }
  }
</script>
<style scoped>
  .content {
    height: 100vh;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
    background-color: #F2F5F8;
  }

  .headSelect {
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
  }

  .btn {
    cursor: pointer;
    background-color: #4084F0;
    font-size: 14px;
    color: #ffffff;
    padding: 7px 35px;
    border-radius: 5px;
    margin-left: 30px;
  }
</style>