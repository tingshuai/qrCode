//二维码生成
<template>
  <div class="gtoup-mangeee">
    <div class="my-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="二维码管理 / 二维码生成">
            <h1 class="title">二维码生成</h1>
              <div class="gm-toast-bodyss">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="24">
                        <el-form-item label="产品型号：" prop="unitType">
                          <el-select v-model="ruleForm.unitType" filterable placeholder="请选择" @change="dropdown">
                            <el-option v-for="item in openIdsData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="9">
                        <el-form-item label="硬件版本：" prop="hardwareVersion">
                          <el-select v-model="ruleForm.hardwareVersion" filterable placeholder="请选择" @change="dropdowns">
                            <el-option v-for="item in hardwareVersion" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="软件版本：" prop="softwareVersion">
                          <el-select v-model="ruleForm.softwareVersion" filterable placeholder="请选择">
                            <el-option v-for="item in softwareVersion" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" style="margin-right:-90px">
                        <el-form-item label="生产年月：" prop="year">
                          <el-input type="text" v-model.trim="ruleForm.year" :maxlength="4" style="width:70px;" @change="checkNoyear(ruleForm.year)"></el-input>
                          <span style="position:absolute;left:85%;top:0">年</span>
                        </el-form-item>
                      </el-col>
                    <!-- </el-row>
                    <el-row> -->
                       <el-col :span="5">
                        <el-form-item prop="month">
                          <el-input type="text" v-model.trim="ruleForm.month" maxlength="2" style="width:70px;" @change="checkNomonth(ruleForm.month)"></el-input>
                          <span style="position:absolute;left:85%;top:0">月</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="生产批次：" prop="productionBatch">
                          <el-input type="text" v-model.trim="ruleForm.productionBatch" :maxlength="20" @change="checkNo(ruleForm.productionBatch)"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="手机串号：" prop="phoneNo" >
                          <el-input type="text" v-model.trim="ruleForm.phoneNo" :maxlength="20" @change="checkNos(ruleForm.phoneNo)"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="模组串号：" prop="moduleNo">
                          <el-input type="text" v-model.trim="ruleForm.moduleNo" :maxlength="20" @change="checkNoss(ruleForm.moduleNo)"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="utb-btn">
                      <el-button type="primary" size="small" @click="submitForm('ruleForm')">生成</el-button>
                      <el-button size="small" @click="init">重置</el-button>
                    </div>
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="编码：">
                          <el-input type="text" disabled v-model="code"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item>
                          <span type="text" style="width:150px;height:150px;display:block;border:1px solid #eee">
                             <img  :src="item.qrCodeImage" alt="" v-for="item in businessTypeList">
                          </span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="utb-btn" style="border-bottom:none;">
                      <el-button type="primary" size="small" @click="submitForms('ruleForm')">保存</el-button>
                      <!-- <el-button size="small" @click="prinTing('ruleForms')">保存并打印</el-button> -->
                      <!-- <el-button type="primary" size="small" @click="submitFormss('ruleForm')">保存并打印</el-button> -->
                      <el-button type="primary" size="small" @click="submitFormsss('ruleForm')">保存并打印</el-button>
                    </div>
                </el-form>
              </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {
    qrCodeGenerate, //生成二维码
    unitTypeName,  //产品型号下拉
    hardwareVersion, //硬件版本下拉
    softwareVersion, //软件版本下拉
    softwareSave, //保存
    prinTing, //打印二维码
  } from "../api/qrCodeGenerate.js";
  export default {
    data() {
      return {
        printer:'',
        code:'', //编码
        qrCodeImage:[], //打印二维码
        businessTypeList:[], //二维码
        openIdsData:[], //产品型号下拉
        hardwareVersion:[], //硬件版本下拉
        softwareVersion:[], //软件版本下拉
        checked:true,
        ruleForm: {
          qrCodeImage:'',
        },
        ruleForms: {
          printer:'',
        },
        rules: { //校验
          unitType: [{ required: true, message: '请输入或选择产品型号', trigger: 'change' }], //产品型号
          hardwareVersion: [{ required: true, message: '请输入或选择硬件版本', trigger: 'change' }], //硬件版本
          softwareVersion: [{ required: true, message: '请输入或选择软件版本', trigger: 'change' }], //软件版本
          year: [{ required: true, message: '请输入年份', trigger: 'change' }], //年
          month: [{ required: true, message: '请输入月份', trigger: 'change' }], //月
          productionBatch: [{ required: true, message: '请输入生产批次且为数字', trigger: 'change' }], //生产批次
          phoneNo: [{ required: true, message: '请输入手机串号且为数字', trigger: 'change' }], //手机串号
          moduleNo: [{ required: true, message: '请输入模组串号且为数字', trigger: 'change' }], //模组串号
        },
        rules1:{ //打印机校验
          printer: [{ required: true, message: '请输入打印机名称', trigger: 'blur' }], //打印机名称
        },
        captchaPath: '',
      };
    },
    mounted(){
        unitTypeName({ //产品型号下拉
          Vue: this
        }).then(data => {
          this.openIdsData = data.data;
        })
    },
    methods: {
       checkNoyear(value){ //生产年只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.year ='';
              }, 0);
          }
        }
      },
       checkNomonth(value){ //生产月只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.month ='';
              }, 0);
          }
        }
      },
       checkNo(value){ //生产批次只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.productionBatch ='';
              }, 0);
          }
        }
      },
       checkNos(value){ //手机串号只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.phoneNo ='';
              }, 0);
          }
        }
      },
       checkNoss(value){ //模组串号只能为数字
        let reg = /^[1-9]\d*$/;
          if (value) {
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                this.ruleForm.moduleNo ='';
              }, 0);
          }
        }
      },
       submitFormss(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              prinTing({ //打印二维码
                Vue: this,
                params:[{
                  printerName:localStorage.getItem("printerName"), 
                  id:this.code,
                  qrCodeImage:this.qrCodeImage 
                }]
              }).then(data => {
                this.$message({
                  message: data.meg,
                    type: 'success'
                  });
                  this.$message.success("二维码打印成功！")
                  this.init()
              })  
          } else {
            return false;
          }
        });
      },
      // prinTing(ruleForms){
          // prinTing({ //打印二维码
          //   Vue: this,
          //   params:[{
          //     printerName:localStorage.getItem("printerName"), 
          //     id:this.code,
          //     qrCodeImage:this.qrCodeImage 
          //   }]
          // }).then(data => {
          //    this.$message({
          //     message: data.meg,
          //       type: 'success'
          //     });
          //     this.$message.success("二维码打印成功！")
          //     setTimeout(()=>{
          //       this.submitForms('ruleForm')  //保存
          //     })
          // })   
      // },
      dropdown(){ //生成硬件版本下拉
            this.hardwareVersion ='',
            hardwareVersion({ //硬件版本下拉
              Vue: this,
              params:{
                unitType:this.ruleForm.unitType,
              }
            }).then(data => {
             let array = [];
                data.data.forEach((item,index)=>{
                    array.push({
                        name:item,
                        id:item,
                      })
                    this.hardwareVersion = array
                })
            })  
      },
      dropdowns(){
            softwareVersion({ //软件版本下拉
              Vue: this,
              params:{
               unitType:this.ruleForm.unitType,
               hardwareVersion:this.ruleForm.hardwareVersion
              }
            }).then(data => {
              let array = [];
                data.data.forEach((item,index)=>{
                    array.push({
                        name:item,
                        id:item,
                      })
                    this.softwareVersion = array
                })
            })
      },
      init(){ //重置按钮
        this.ruleForm={};
        this.code ='';
        this.businessTypeList=[];
        this.resetForm();//清除校验
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              qrCodeGenerate({ //生成二维码
                Vue: this,
                params:this.ruleForm,
              }).then(data => {
                this.qrCodeImage = data.data.qrCodeImage,
                this.code = data.data.qrCode
                this.$message.success("二维码生成成功！")
                this.businessTypeList = [data.data]
              })
          } else {
            return false;
          }
        });
      },
      submitForms(formName) {  //保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
              softwareSave({
                Vue: this,
                params:this.ruleForm,
              }).then(data => {
                this.$message.success("保存成功！")
                this.init()
              })
          } else {
            return false;
          }
        });
      },
      submitFormsss(formName) {  //保存并打印
        this.$refs[formName].validate((valid) => {
          if (valid) {
              softwareSave({
                Vue: this,
                params:this.ruleForm,
              }).then(data => {
                this.$message.success("保存成功！")
                this.submitFormss(formName)
                this.init()
              })
          } else {
            return false;
          }
        });
      },
      resetForm() { //清除校验
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>
<style lang="less">
  .gm-toast-bodyss {
    margin-top:20px;
    width:935px;
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
      width:123%;
      margin-left:14px;
      padding-left: 85px;
      margin-bottom: 20px;
    }
    .el-button--mini, .el-button--small {
      width: 110px;
    }
  }
</style>