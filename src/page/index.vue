//首页
<template>
  <page :pageData="pageData"></page>
</template>
<script>
  // import {
  //   MenuInterface,//菜单接口  
  // } from "../api/login.js";
  export default {
    data() {
      return {
        pageData: {
          sidebarData: [{
            visible: true,
            path: '/twoDimensionalCodeManagement',
            data: [{
              name:'二维码管理',
              router:'/twoDimensionalCodeManagement',
              chlid:[
                  {
                    name: '二维码查询',
                    router: '/qrCodeQuery',
                  },
                  {
                    name: '二维码生成',
                    router: '/qrCodeGenerate',
                  }
                ]
            },{
              name:'基础设置',
              router:'/groupManagement',
              chlid:[  
                  {
                    name: '版本管理',
                    router: '/versionManagement',
                  },
                  {
                    name: '产品型号',
                    router: '/ProductModel',
                  }  
              ]
            },{
              name:'系统管理',
              router:'/groupManagements',
              chlid:[  
                  {
                    name: '账户管理',
                    router: '/accountManagement',
                  },{
                    name: '日志管理',
                    router: '/logManagement',
                  },{
                    name: '显示屏品牌型号库',
                    router: '/displayBrandModelLibrary',
                  },    
              ]
            },{
              name:'设备出库',
              router:'/groupManagementss',
              chlid:[  
                  {
                    name: '出库管理',
                    router: '/qutgoingManagement',
                  }
              ]
            },
            ]
          }]
        }
      }
    },
    // mounted(){
    //   // debugger;
    //   MenuInterface({ 
    //     Vue: this
    //   }).then(data => {
    //      debugger;
    //   })
    // }
  }
</script>
<style lang="less"></style>
