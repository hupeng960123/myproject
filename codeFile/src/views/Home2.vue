<template>
  <div class="home">
    <div class="topBox">
      <HeadEntry2 :dataList="dataList"/>
    </div>
    <div class="bottomBox">
      <div class="leftBox">
        <HomeBody2></HomeBody2>
      </div>
      <div class="rightBox">
        <HomeRightLead v-if="show&&userType==1"></HomeRightLead>
        <HomeRightCommon v-if="show&&userType==2"></HomeRightCommon>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HeadEntry from "@/components/HeadEntry";
  import HeadEntry2 from "@/components/HeadEntry2";
  import HomeBody2 from "../components/HomeBody2";
  import HomeRightLead from "../components/HomeRightLead";
  import HomeRightCommon from "../components/HomeRightCommon";
  import {api_user_info, v_login} from '../services/index.js'
  import {api_jsc_index_info} from "../services/index";

  export default {
    name: 'Home2',
    data() {
      return {
        show: false,
        type: 2,
        userType: 0,
        dataList: [],
        colorList: ['#FFB400', '#53CE46', '#1B9CFF', '#FF5656', '#165AC6', '#9B64FF']
      }
    },
    components: {
      HeadEntry2, HomeBody2, HomeRightLead, HomeRightCommon
    },
    mounted() {
      if(process.env.NODE_ENV !== 'production'){
        // v_login({
        //   widget_data: JSON.stringify({
        //     username: 'admin',
        //     pwd: 'UJTpQC17Pe3ws0jdzayzMA=='
        //   })
        // }).then((res) => {
        //   this.show = true
        // })
      }
      api_user_info().then(res => {
        if (res.c == 40004) {
          //未登录
        } else {
          this.show = true
          if (res.d?.role_key == 'ROLE_KEY_YBRY') {
            this.$globalData.userType = 2
            this.userType = 2
          } else {
            this.$globalData.userType = 1
            this.userType = 1

          }
        }

        ///获取跳转和select数据
        let params = {
          action: 1,
          sub_action: 1
        }
        api_jsc_index_info(params).then(res => {
          if (res.c == 0) {
            this.dataList = res.d.data_list
            this.dataList.forEach((item, index) => {
              item.color = this.colorList[index]
            })
          }
        })
      })
    },
  }
</script>
<style scoped>
  .home {
    background-color: #F2F5F8;
    height: 100vh;
    width: 100%;
    min-width: 1270px;
    padding: 20px;
    box-sizing: border-box;
  }

  .topBox {
    height: 180px;
    width: 100%;
  }

  .bottomBox {
    width: 100%;
    height: calc(100% - 200px);
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .leftBox {
    /*width: 1050px;*/
    width: calc(100% - 400px);
    height: 100%;
    overflow: hidden;
  }

  .rightBox {
    width: 380px;
    height: 100%;
  }

</style>
