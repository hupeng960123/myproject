<template>
  <div class="headContent">
    <div class="title">快速入口</div>
    <div class="content">
      <div v-for="(item,index) in dataList" :key="index" class="content_li" :style="{backgroundColor: item.color}"
           @click="handelClick(item)">
        <div>{{item.link_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {api_jsc_index_info} from '../services/index.js'
  import common from "../utils/common";

  export default {
    name: 'HeadEntry',
    props: {
      dataList: {
        default: []
      },
      type: {
        default: 1
      }
    },
    data() {
      return {
        value1: '',
        image1:require('../assets/1.png'),
      }
    },
    mounted() {

    },
    methods: {
      handelClick(item) {
        if (item.link_url) {
          common.redirect(item.link_url)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headContent {
    height: 130px;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #484B52;
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .content_li {
    min-width: 110px;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
</style>
