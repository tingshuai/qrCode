import Vue from 'vue'
import Router from 'vue-router'
//主路由
const index = () =>
  import ('../page/index.vue'); //首页应用中心 
const qrCodeQuery = () =>
  import ('../page/qrCodeQuery.vue'); //二维码查询 
const qrCodeGenerate = () =>
  import ('../page/qrCodeGenerate.vue'); //二维码生成
const versionManagement = () =>
  import ('../page/versionManagement.vue'); //基础设置/版本管理
const ProductModel = () =>
  import ('../page/ProductModel.vue'); //基础设置/产品型号
const accountManagement = () =>
  import ('../page/accountManagement.vue'); //系统设置/账户管理
const logManagement = () =>
  import ('../page/logManagement.vue'); //系统设置/日志管理
const displayBrandModelLibrary = () =>
  import ('../page/displayBrandModelLibrary.vue'); //系统设置/显示屏品牌型号库
const qutgoingManagement = () =>
  import ('../page/qutgoingManagement.vue'); //设备出库/出库管理
const login = () =>
  import ('../page/login.vue'); //用户登录
Vue.use(Router)
export default new Router({
  routes: [{
      path: "/index",
      name: 'index',
      component: index,
      children: [
       { //二维码查询
          path: "/qrCodeQuery",
          component: qrCodeQuery,
          name: "qrCodeQuery"
        },{ //二维码生成
          path: "/qrCodeGenerate",
          component: qrCodeGenerate,
          name: "qrCodeGenerate"
        },{ //基础设置/版本管理
          path: "/versionManagement",
          component: versionManagement,
          name: "versionManagement"
        },{ //基础设置/产品型号
          path: "/ProductModel",
          component: ProductModel,
          name: "ProductModel"
        },{ //系统设置/账户管理
          path: "/accountManagement",
          component: accountManagement,
          name: "accountManagement"
        },{ //系统设置/日志管理
          path: "/logManagement",
          component: logManagement,
          name: "logManagement"
        },{ //系统设置/显示屏品牌型号库
          path: "/displayBrandModelLibrary",
          component: displayBrandModelLibrary,
          name: "displayBrandModelLibrary"
        },{ //设备出库/出库管理
          path: "/qutgoingManagement",
          component: qutgoingManagement,
          name: "qutgoingManagement"
        }
      ]
    },{ //登录
      path: "/login",
      component: login,
      name: "login"
    },
  ]
})