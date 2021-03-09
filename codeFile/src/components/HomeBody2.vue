<template>
  <div class="mainContent">
    <div class="content" style="height: 40%;margin-top: 0;">
      <span v-if="link_data_dict1" class="btn" @click="linkClick(link_data_dict1)">{{link_data_dict1.name}}</span>
      <div class="title">我的待办</div>
      <div class="f_c">
        <div class="f_c_li f_c_li_head">
          <span class="s_1">日期</span>
          <span class="s_2">内容</span>
          <span class="s_3">上一处理人</span>
          <span class="s_3">环节</span>
          <span class="s_4">状态</span>
        </div>
        <div class="content_fc">
          <div class="f_c_li" v-for="(item,index) in data_db" :key="index">
            <span class="s_1">{{item.begin_time}}</span>
            <span class="s_2">{{item.title}}</span>
            <span class="s_3">{{item.flow_node_user}}</span>
            <span class="s_3">{{item.label}}</span>
            <span class="s_4" :style="{color:item.color}">{{item.flow_state}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" style="height:calc(30% - 15px)">
      <span v-if="link_data_dict2" class="btn" @click="linkClick(link_data_dict2)">{{link_data_dict2.name}}</span>
      <div class="title">我提交的</div>
      <div class="f_c">
        <div class="f_c_li f_c_li_head">
          <span class="s_1">日期</span>
          <span class="s_2">内容</span>
          <span class="s_3">当前处理人</span>
          <span class="s_3">环节</span>
          <span class="s_4">状态</span>
        </div>
        <div class="content_fc">
          <div class="f_c_li" v-for="(item,index) in data_tj" :key="index">
            <span class="s_1">{{item.begin_time}}</span>
            <span class="s_2">{{item.title}}</span>
            <span class="s_3">{{item.approval_user}}</span>
            <span class="s_3">{{item.label}}</span>
            <span class="s_4" :style="{color:item.color}">{{item.flow_state}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" style="height:calc(30% - 15px)">
      <span v-if="link_data_dict3" class="btn" @click="linkClick(link_data_dict3)">{{link_data_dict3.name}}</span>
      <div class="title">已办结</div>
      <div class="f_c">
        <div class="f_c_li f_c_li_head">
          <span class="s_1">发起日期</span>
          <span class="s_2">内容</span>
          <span class="s_3">办结日期</span>
        </div>
        <div class="content_fc">
          <div class="f_c_li" v-for="(item,index) in data_bj" :key="index">
            <span class="s_1">{{item.begin_time}}</span>
            <span class="s_2">{{item.title}}</span>
            <span class="s_3">{{item.end_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {api_jsc_index_info} from "../services/index";
  import common from "../utils/common";

  export default {
    name: 'HomeBody2',
    data() {
      return {
        data_db: [],
        data_tj: [],
        data_bj: [],
        link_data_dict1: null,
        link_data_dict2: null,
        link_data_dict3: null,
      }
    },
    mounted() {
      let params1 = {
        action: 1,
        sub_action: 3,
        info: JSON.stringify({field1: '1'})
      }
      let params2 = {
        action: 1,
        sub_action: 3,
        info: JSON.stringify({field1: '2'})
      }
      let params3 = {
        action: 1,
        sub_action: 3,
        info: JSON.stringify({field1: '3'})
      }
      this.getData(params1, params2, params3)
    },
    methods: {
      getData(params1, params2, params3) {
        api_jsc_index_info(params1).then(res => {
          if (res.c == 0) {
            this.data_db = res.d.data_list
            this.link_data_dict1 = res.d.link_data_dict
          }
        })
        api_jsc_index_info(params2).then(res => {
          if (res.c == 0) {
            this.data_tj = res.d.data_list
            this.link_data_dict2 = res.d.link_data_dict
          }
        })
        api_jsc_index_info(params3).then(res => {
          if (res.c == 0) {
            this.data_bj = res.d.data_list
            this.link_data_dict3 = res.d.link_data_dict
          }
        })
      },
      linkClick(item) {
        if (item.url) {
          common.redirect(item.url)
        }
      },
    }
  }
</script>
<style scoped>
  .mainContent {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .content {
    background-color: #fff;
    border-radius: 4px;
    padding: 15px 15px 0 15px;
    margin-top: 15px;

    box-sizing: border-box;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #484B52;
  }

  .btn {
    float: right;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    color: #7E848E;
  }

  .btn:hover {
    color: #3a8ee6;
  }

  .f_c {
    height: calc(100% - 35px);
    margin-top: 10px;
    overflow: hidden;
  }

  .content_fc{
    height: calc(100% - 40px);
    overflow-y: auto;
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