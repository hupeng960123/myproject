import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/base.css';
import global from './global/index'
import router from './router'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$globalData = global
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
