//考勤管理
<template>
    <div class="poc-page">
    <!-- 导航 -->
    <poc-header @headerBack="headerBack"></poc-header>
    <!-- 主体 -->
    <div class="poc-page-main clearfix">
        <sidebar v-if="isSidebar" :config="sidebarData" @slideBack="slideBack" ref="sidebar"></sidebar>
        <div class="poc-page-body" :class="sidebarData.visible?'left-go':'left-back'">
            <!-- <div class="bread-crumbs">
                 <p>{{setTitle}}</p>
                 <h1>{{subtitle}}</h1>
             </div> -->
             <router-view></router-view>    
        </div>
    </div>
    </div>
</template>
<script>
import {
  getChatGroups, //分页查询
} from "../api/qrCodeQuery.js"
import axios from 'axios'
import router from '../router/index'
export default {
  props:['pageData'],  
  data(){
    return{
        sidebarData:{},
        setTitle:'',
        h1:'',
        subtitle:'',
        isSidebar:true
    }
  },
  mounted(){
      this.sidebarData =  this.pageData.sidebarData[0];
    //   debugger;
      this.setInfoShow();
            let token = localStorage.getItem("token");
            if(token == null){
                this.$router.push({ path:'/login'});
            }else{
                this.$router.push({ path:'/qrCodeQuery'}); 
            }
  },
  methods:{
      slideBack(data,subtitle){
            this.setTitle = this.h1+data;
            this.subtitle = subtitle;
      },
      headerBack(index,title){
            this.sidebarData = this.pageData.sidebarData[index];
            this.setInfoShow();            
            //默认切换第一个router 
            let result = this.sidebarData.data[0].chlid?this.sidebarData[0].chlid[0]:this.sidebarData.data[0];
            this.$router.push({ path:result.router});
            //重新渲染
            this.isSidebar = false;
            setTimeout(()=>{
                this.isSidebar = true;
            },0)
      },
      setSubtitle(chlid){
            if(chlid){//副标题
                this.subtitle = chlid[0].name;
            }else{
                this.subtitle = this.sidebarData.data[0].name
            }
      },
      setInfoShow(){
            this.h1 = this.sidebarData.title;
            let chlid = this.sidebarData.data[0].chlid;
            this.setSubtitle(chlid);
            this.setTitle = this.h1 +' / '+this.sidebarData.data[0].name+(chlid?' / '+chlid[0].name:'');
      },
    }
}
</script>

<style lang="less">
.poc-page{
    .bread-crumbs{
        height: 82px;
        background-color: white;
        margin-bottom: 24px;
        padding-left: 24px;
        padding-top: 17px;
        box-sizing: border-box;
        p{
            color: #666;
            font-size: 14px;
            line-height: 1;
        }
        h1{
            color: #333;
            font-size: 20px;
            margin-top: 16px;
            line-height: 1;
        }
    }
    .poc-page-main{
        position: absolute;
        top: 80px;
        bottom: 0;
        width: 100%;
        min-height: 600px;
        min-width: 1280px;
        max-height: 100vh;
        .poc-page-body{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            transition: left 0.5s;
            overflow: auto;
            box-sizing: border-box;
            padding: 20px;
        }
    }
    .left-go{
        left: 260px;
    }
    .left-back{
        left: 0;
    }
   }
</style>
