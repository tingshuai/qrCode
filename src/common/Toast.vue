      /* toastData:{
          title:'啦啦啦',//弹窗标题
          dialogVisible:true,//弹窗显示
          width:'600px',//弹窗宽
          btnData:[{
            name:'确定',//按钮名
            method:'dialogSuer',//回调函数
            bgColor:'dialog-bule'//按钮背景
          },{
            name:'确定并继续',
            method:'savaAgain',
            bgColor:'dialog-deep-blue'
          }]
      }*/
<template>
    <el-dialog class="poc-toast" :title="config.title" :visible.sync="config.dialogVisible" :close-on-click-modal="false" :append-to-body="config.appendToBody" :width="config.width" @close="callBack('handleClose')">
        <!-- 内容   主题内容自定义部分-->
        <slot></slot>
        <!-- 按钮组 -->
        <div class="btn-group" v-if="config.btnData&&config.btnData.length>0">
            <el-button class="dialog-white" v-for="item in config.btnData" :type="item.type" :class="item.bgColor" :disabled="item.disabled" @click="callBack(item.method)">{{item.name}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: ["config"],
  methods: {
    callBack(method) {
      this.$emit(method);
    }
  }
};
</script>
<style lang="less">
// @headerbgImage: linear-gradient(to right, #4a8dd2, #2acaff);
// @headerbgColor:#4a8dd2;
@headerbgColor: rgba(39, 44, 52, 1);
.poc-toast {
  .el-dialog {
    // border-radius: 5px;
    overflow: hidden;
  }
  .dialog-bule {
    background-color: #409EFF;
    color: white;
    padding: 10px 15px;
  }
  .dialog-deep-blue {
    background-color: #0c68f1;
    color: white;
    padding: 10px 15px;
  }
  .dialog-white {
    padding: 10px 15px;
  }
  .el-dialog__header {
    background-color: #F0EFF5;
    padding: 15px;

    .el-dialog__title {
      color: #333333;
    }
  }
  .el-dialog__body {
    padding: 25px 0  0;
  }
  .btn-group {
    text-align: left;
    padding: 5px 10px;
    margin-top: 20px;
    margin-left:45px;
    margin-bottom:10px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #333333;
  }
}
.btn-group{
  .el-button{
    width:113px;
    border-radius: 0px;
  }
}
</style>
