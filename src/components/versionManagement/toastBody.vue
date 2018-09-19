<template>
    <div class="gm-toast-body">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品型号：" prop="sysDictId">  
              <el-select placeholder="请选择" v-model="ruleForm.sysDictId">
                <el-option v-for="item in managerIdData" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="硬件版本：" prop="hardwareVersion">
              <el-input type="text" v-model="ruleForm.hardwareVersion" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="软件版本：" prop="softwareVersion">
              <el-input type="text" v-model="ruleForm.softwareVersion" maxlength="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
               <el-input
                maxlength="200"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="请输入内容"
                v-model="ruleForm.remark">
               </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import {
    productModel 
  } from '../../api/versionManagement.js' //产品型号下拉
  export default {
    data() {
      return {
        ruleForm: {
          sysDictId: '', //产品型号
          hardwareVersion: '', //硬件版本
          softwareVersion: '', //软件版本
          remark: '', //备注
        },
        rules: {  //校验
          sysDictId: [{required: true, message: '此选择为必填项', trigger: 'change'}], //产品型号
          hardwareVersion: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //硬件版本 
          softwareVersion: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //软件版本
        },
        managerIdData: []
      }
    },
    mounted() {
       productModel({  //产品型号下拉
          Vue: this,
        }).then(data => {
          this.managerIdData = data.data;
        })
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
<style lang="less">
  .gm-toast-body {
    padding: 0 40px;
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
