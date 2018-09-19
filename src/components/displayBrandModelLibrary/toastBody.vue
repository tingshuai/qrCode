<template>
    <div class="gm-toast-body">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="品牌：" prop="brand">
              <el-input type="text" v-model="ruleForm.brand" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="型号" prop="version"> 
              <el-input type="text" v-model="ruleForm.version" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import {
    roleManagement, //角色管理
  } from '../../api/accountManagement.js'
  export default {
  data(){
    return{  
        ruleForm: {
          brand:'', //品牌
          version:'', //型号
        },
        rules: { //校验
          brand: [{ required: true, message: '请输入用户名', trigger: 'blur' }], //品牌
          version: [{ required: true, message: '请输入型号', trigger: 'blur' }], //型号
        },
      }
    },
    mounted(){
    },
    methods: {
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              if (fun) {
                fun();
              }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    },
  }
</script>
<style lang="less" scoped>
  .gm-toast-body {
    padding: 0 40px;
    margin-left: 60px;
    .el-form-item__content {
      color: #333;
      font-size: 14px;
    }
    .el-form-item__label {
      color: #666666;
      font-size: 14px;
    }
    .utb-btn{
      border-bottom:1px dashed #eee;
      height:50px;
      width:1100px;
      margin-left:-41px;
      padding-left: 58px;
      margin-bottom: 20px;
    }
    .el-button--mini, .el-button--small {
      width: 110px;
    }
  }
</style>
