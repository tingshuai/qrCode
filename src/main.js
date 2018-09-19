import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import 'url-search-params-polyfill'//兼容formData数据格式转化
import axios from 'axios'
import Loading from './common/Loading.vue' //loading
import mesTable from './common/Table.vue' //表格组件
import lineTable from './common/Tables.vue' //表格组件...........
import toolbar from './common/toolbar.vue' //按钮组件
import pocHeader from './common/pocHeader.vue'
import page from './common/page.vue'
import Sidebar from './common/Sidebar.vue'
import mesSearch from './common/search.vue'
import mesToast from './common/Toast.vue'
import lookInfo from './common/lookInfo' 
import { Script } from 'vm';
// import './api/mock/mock'
// import  './api/mock/xhMock'
Vue.config.productionTip = false

//element UI
Vue.use(Element);
//全局组件
Vue.component('mesTable', mesTable) //表格组件
Vue.component('lineTable', lineTable) //表格组件............
Vue.component('toolbar', toolbar)
Vue.component('Loading', Loading)
Vue.component('pocHeader', pocHeader)
Vue.component('Page', page)
Vue.component('Sidebar', Sidebar);
Vue.component('mesSearch', mesSearch);
Vue.component('mesToast', mesToast);
Vue.component('lookInfo',lookInfo);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  destroyed () {
    localStorage.clear();
  }
})
//路由守卫
// router.beforeEach((to, from, next) => {
//     //跳转
//     next();
// })
// http请求拦截器
axios.interceptors.request.use(config => {
  // debugger;
  //开始请求(拦截开始)
  store.commit('setIsLoading', true)
  return config
}, error => {
  // debugger;
  //加载超时
      store.commit('setIsLoading', false)
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  // debugger;
  //响应拦截
    store.commit('setIsLoading', false)
    if(data.data.code===401){
      router.push('/login');
    }
  return data
}, error => {
  // debugger;
    store.commit('setIsLoading', false)
    return Promise.reject(error)
})

  // // 全局路由守卫
  //       router.beforeEach((to, from, next) => {
  //       // debugger;
  //       // to: Route: 即将要进入的目标 路由对象
  //       // from: Route: 当前导航正要离开的路由
  //       // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  //       // const nextRoute = ['login', 'qrCodeGenerate'];
  //       let token = localStorage.getItem("token");  // 是否登录
  //       // 未登录状态；当路由到nextRoute指定页时，跳转至login
  //       if (to.path !== '/login') {  
  //           if (!token) {
  //            debugger;
  //              this.$router.push({ path:'/login'});
  //           }
  //       }
  //       // 已登录状态；当路由到login时，跳转至qrCodeGenerate 
  //       if (to.path === '/login') {
  //           if (token) {
  //           this.$router.push({ path: '/qrCodeGenerate' });
  //           }
  //       }
  //       next(); 
  //       });
  //       export default router;