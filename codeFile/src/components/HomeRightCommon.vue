<template>
  <div class="leftContent">
    <div class="title">文书模板</div>
    <div class="selectBox">
      <!--      <div class="s_li">-->
      <!--        <el-select v-model="value1" placeholder="请选择" size="small" style="width: 120px;margin-right: 10px">-->
      <!--          <el-option-->
      <!--            v-for="item in options"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </div>-->
      <div class="s_li"></div>
      <el-input size="small" style="width: 50%;" v-model="value2" clearable placeholder="关键字"></el-input>
      <span class="btn" @click="goSearch">搜索</span>
    </div>
    <div class="content">
      <div v-for="(item,index) in dataList" :key="index" class="list">
        <div class="letIndex">{{index+1}}</div>
        <div class="right_content">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {api_jsc_index_info} from "../services";

  export default {
    name: 'HomeRightCommon',
    data() {
      return {
        value1: '',
        value2: '',
        options: [],
        dataList: []
      }
    },
    mounted() {
      let params = {
        action: 1,
        sub_action: 4
      }
      api_jsc_index_info(params).then(res => {
        if (res.c == 0) {
          this.dataList = res.d.data_list
        }
      })
    },
    methods: {
      goSearch() {
        let params = {
          action: 1,
          sub_action: 4,
          info: JSON.stringify({'field1': this.value2})
        }
        api_jsc_index_info(params).then(res => {
          if (res.c == 0) {
            this.dataList = res.d.data_list
          }
        })
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

  .selectBox {
    margin-top: 15px;
    height: 32px;
    width: 100%;
    white-space: normal;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: 0;
  }

  .selectBox .s_li {
    display: inline-block;
    vertical-align: top;

  }

  .selectBox .btn {
    padding: 0px 15px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-color: #4084F0;
    color: #ffffff;
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
  }

  .content {
    height: calc(100% - 100px);
    margin-top: 20px;
    overflow-y: auto;
    padding-right: 20px;
  }

  .list {
    display: flex;
    align-content: center;
    font-size: 0;
    padding: 10px 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .letIndex {
    background-color: #4084F0;
    display: inline-block;
    font-size: 14px;
    color: #ffffff;
    min-width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 3px;
  }

  .right_content {
    display: inline-block;
    font-size: 14px;
    color: #484B52;
    margin-left: 20px;
  }

</style>