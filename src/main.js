// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' 
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css' 
import axios from 'axios'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

axios.interceptors.request.use(
  config => {
    var token=JSON.parse(window.sessionStorage.getItem('archives_token'))
    if ((token.token) != null) {
      config.headers.Authorization = token.token;
    
    // config.headers.Authorization='231e75b9ead643d3b476e4b62cad151e'
    // console.log('带token请求');
    
      return config;
    }
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response =>{
    // if(response.data.authorityStatus == 1){
    //   alert("您没有权限,请重新登陆");
    //   window.location.href = "http://www.wangniubi.cn/archives/error.html"
    // }else if(response.data.authorityStatus == 2){
    //   alert("登陆过期，请重新登陆");
    //   window.location.href = "http://www.wangniubi.cn/archives/login.html";
    // }else{
    //   return response;
    // }
    

    if(response.data.authorityStatus == 1){
      alert("您没有权限,请重新登陆");
      window.location.href = "http://www.wangniubi.cn/archives/error.html"
    }else if(response.data.authorityStatus == 2){
      alert("登陆过期，请重新登陆");
      window.location.href = "http://www.wangniubi.cn/archives/login.html";
    }else{
      return response;
    }
  }
)
// 注册到全局

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.prototype.$axios= axios

Vue.use(VueRouter);
Vue.use(ElementUI,{size:'small'});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



