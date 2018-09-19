<template>
    <div class="gm-toast-body">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出货单号：" prop="outNo">
              <el-input type="text" v-model="ruleForm.outNo" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出货人：" prop="outBy">
              <el-input type="text" v-model="ruleForm.outBy" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="出货时间：" prop="outDate">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.outDate"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备名称：" prop="equipmentName">
              <el-input type="text" v-model="ruleForm.equipmentName" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="agent">
              <el-input type="text" v-model="ruleForm.agent" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理商：" prop="customer">
              <el-input type="text" v-model="ruleForm.customer" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="utb-btn">
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">出货</el-button>
            <el-button size="small" @click="init">重置</el-button>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码：">
              <el-input type="text" disabled v-model="code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <span type="text" style="width:150px;height:150px;display:block;border:1px solid #eee">
                  <img  :src="item.qrCodeImage" alt="" v-for="item in businessTypeList" style="width:150px;height:150px;">
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import {
    qrCodeGenerate, //出货生成二维码 
  } from '../../api/qutgoingManagement.js'  
  export default {
    props:['codes'],
    data() {
      return {
        qrCodeImage:[], //打印二维码
        ruleForm: {
          outNo: '', //出货单号
          outBy: '', //出货人
          outDate: '', //出货时间
          equipmentName: '', //设备名称
          agent: '', //客户名称
          customer: '', //代理商
        },
        rules: {  //校验
          outNo: [{required: true, message: '出货单号不能为空！', trigger: 'blur'}], //出货单号
          outBy: [{required: true, message: '请输入出货人', trigger: 'blur'}], //出货人 
          outDate: [{required: true, message: '请选择出货时间', trigger: 'blur'}], //出货时间
          equipmentName: [{required: true, message: '请输入设备名称', trigger: 'blur'}], //设备名称
          agent: [{required: true, message: '请输入客户名称', trigger: 'blur'}], //客户名称
          customer: [{required: true, message: '请输入代理商', trigger: 'blur'}], //代理商
        },
        managerIdData: [],
        code:'', //编码
        businessTypeList:[],//二维码图片
      }
    },
    mounted() {
    
    },
    methods: {
      yyyyy(data){
         console.log("333333333333333333333333",data)
         this.code = data.outNo;
         this.businessTypeList = [data]
      },
      qqq(data){  //打印二维码
        this.qrCodeImage =[{
          id:data.outNo,
          printerName:localStorage.getItem("printerName"), 
          qrCodeImage:data.qrCodeImage,
        }]
      },
      init(){ //重置按钮
         this.ruleForm={};
         this.code ='';  //编码
         this.businessTypeList=[]; //二维码图片
         this.resetForm();//清除校验
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              qrCodeGenerate({ //出货生成二维码
                Vue: this,
                params:this.ruleForm,
              }).then(data => {
                this.code = data.data.qrCode
                this.$message.success("二维码生成成功！")
                this.businessTypeList = [data.data]
                this.qrCodeImage = data.data.qrCodeImage
                this.qrCodeImage = data.data.qrCode
                this.qrCodeImage =[{
                  printerName:localStorage.getItem("printerName"),
                  qrCodeImage:data.data.qrCodeImage,
                  id:data.data.qrCode,
                }]
              })
          } else {
            return false;
          }
        });
      },
      submitForms(fun) {
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
    .el-form-item__error {
      width: 180px;
    }
  }
</style>
