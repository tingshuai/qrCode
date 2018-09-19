// 侧边栏
<template>
  <div class="menu_nav_collapse" :class="sidebar">
    <!-- <div class="menu-slide-header">
      <span>{{config.title}}</span>
    </div> -->
    <el-menu :default-active="config.path" class="el-menu-vertical-demo" background-color="#001529" text-color="#fff"
       router active-text-color="white">
      <template v-for="(item,index) in config.data">
        <!-- 二级 -->
        <el-submenu :index="item.router" v-if="item.chlid">
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="_item in item.chlid" :index="_item.router" @click="router(item,_item)">{{_item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 级别一 -->
        <el-menu-item v-else :index="item.router" @click="router(item)">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!-- 拖拉 -->
    <span class="el-icon-d-arrow-left" :class="menuDrag" @click="goback"></span>
  </div>
</template>

<script>
  // import {
  //   MenuInterface,//菜单接口  
  // } from "../api/login.js";
  export default {
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    computed: {
      menuDrag() {
        let result = this.config.visible ? 'el-icon-d-arrow-left menu-drag-go' : 'el-icon-d-arrow-right menu-drag-back';
        return result;
      },
      sidebar() {
        let result = this.config.visible ? 'menu-slide-enter-active' : 'menu-slide-enter';
        return result;
      }
    },
    // mounted(){
    //   debugger;
    //   MenuInterface({ 
    //     Vue: this
    //   }).then(data => {
    //      debugger;
    //   })
    // },
    methods: {
      router(item,_item={}) {
        let  result = ' / ' + item.name+(_item.name?' / '+_item.name:'');
        let  subtitle = _item.name?_item.name:item.name;
        this.$emit('slideBack', result,subtitle);
      },
      goback() {
        this.config.visible = !this.config.visible;
      }
    }
  }

</script>

<style lang="less">
.menu_nav_collapse {
    width: 256px;
    float: left;
    height: 100%;
    background-color: #001529;
    box-sizing: border-box;
    position: relative;
    transition: margin-left 0.5s;
    margin-left: 0;
    z-index: 1;
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  .el-menu {
    border-right: none;
  }

  .el-submenu.is-opened {
    background-color: #000C17;
  }

  .menu-slide-header {
    background-color: #002140;
    color: white;
    padding-left: 20px;
    span {
      vertical-align: middle;
      font-size: 18px;
      line-height: 60px;
      padding-left: 15px;
    }
  }


  .menu-silde-item {
    text-align: center;
    color: white;
    width: 140px;
    height: 40px;
    margin: 10px auto;
    line-height: 40px;
    cursor: pointer;
    // border-radius: 5px;
  }

  .menu-drag-go,
  .menu-drag-back {
    position: absolute;
    top: 50%;
    height: 70px;
    width: 35px;
    margin-top: -40px;
    text-align: center;
    line-height: 70px;
    background-color: #232429;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }

  .menu-drag-back {
    right: -35px;
    // border-radius: 0px 5px 5px 0;
  }

  .menu-drag-go {
    right: 0;
    // border-radius: 5px 0px 0 5px;
  }

  .menu-silde-item.menu-silde-active {
    background-color: #409EFF;
    background-image: linear-gradient(to right, #4a8dd2, #409EFF);
    color: white;
  }

  .menu-silde-item:hover {
    background-image: linear-gradient(to right, #8ebded, #409EFF);
    color: white;
  }

  .menu-slide-enter-active {
    margin-left: 0px;
  }

  .el-submenu.is-opened .el-menu-item.is-active {
    background-color: #2A93FF !important;
  }
  .el-menu-item.is-active{
    background-color: #2A93FF !important;
  }

  .menu-slide-enter {
    margin-left: -260px;
  }

  // .el-submenu.is-opened .el-submenu__title {
    //  background-color: #000C17 !important;
  // }
  .el-submenu__title * {
    vertical-align: middle;
    font-size: 16px;
  } 
  .el-submenu.is-opened .el-menu-item {
    background-color: #000C17 !important;
  }

  .el-submenu__title,.el-menu-item{
    padding-left: 76px !important;
  }
 
  .el-menu-item-group .el-menu-item {
    padding-left: 105px !important;
  }
</style>
