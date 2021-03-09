<template>
  <div class="headContent">
    <div class="title">快速入口</div>
    <div class="content">
      <div v-for="(item,index) in dataList" :key="index" class="content_li" :style="setStyle(item,index)"
           @click="handelClick(item)">
        <div style="text-indent: 55px;">{{item.link_name}}</div>
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
      }
    },
    data() {
      return {
        value1: '',
        imgPath: [
          require('../assets/1.png'),
          require('../assets/2.png'),
          require('../assets/3.png'),
          require('../assets/4.png'),
          require('../assets/5.png'),
          require('../assets/6.png'),
        ]
      }
    },
    mounted() {

    },
    methods: {
      handelClick(item) {
        if (item.link_url) {
          common.redirect(item.link_url)
        }
      },
      setStyle(item, index) {
        let obj = {}
        obj.backgroundImage = `url(${this.imgPath[index]})`
        return obj
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headContent {
    background-color: #fff;
    padding: 15px;
    height: 100%;
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
    width: 240px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
  }
</style>
