<template>
  <div class="home">
    <div class="leftBox">
      <HeadEntry :dataList="dataList"/>
      <HomeBody :jg_select="jg_select"></HomeBody>
    </div>
    <div class="rightBox">
      <HomeRightLead v-if="show&&userType==1"></HomeRightLead>
      <HomeRightCommon v-if="show&&userType==2"></HomeRightCommon>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HeadEntry from "@/components/HeadEntry";
  import HomeBody from "../components/HomeBody";
  import HomeRightLead from "../components/HomeRightLead";
  import HomeRightCommon from "../components/HomeRightCommon";
  import {api_user_info, v_login} from '../services/index.js'
  import {api_jsc_index_info} from "../services/index";

  export default {
    name: 'Home',
    data() {
      return {
        show: false,
        userType: 0,
        dataList: [],
        colorList: ['#FFB400', '#53CE46', '#1B9CFF', '#FF5656', '#165AC6', '#9B64FF'],
        jg_select: []
      }
    },
    components: {
      HeadEntry, HomeBody, HomeRightLead, HomeRightCommon
    },
    mounted() {
      // v_login({
      //   widget_data: JSON.stringify({
      //     username: 'coffen',
      //     pwd: 'GWriormazBFMuCwDjtPZww=='
      //   })
      // }).then((res) => {
      //   this.show = true
      // })
      api_user_info().then(res => {
        if (res.c == 40004) {
          //未登录直接去首页
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
            this.jg_select = res.d.jg_select
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
    width: 100vw;
    min-width: 1270px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .leftBox {
    width: 1250px;
    height: 100%;
    overflow: hidden;
  }

  .rightBox {
    width: calc(100% - 1270px);
    height: 100%;
  }

</style>
